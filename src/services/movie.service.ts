import axios from "axios";
import { AppDataSource } from "../db";
import { Movie } from "../entities/Movie";
import { filter } from "../utils";
import type { MovieModel } from "../models/movie.model";
import { DirectorService } from "./director.service";
import { Actor } from "../entities/Actor";
import { ActorService } from "./actor.service";
import type { Genre } from "../entities/Genre";
import { GenreService } from "./genre.service";
import { MovieActor } from "../entities/MovieActor";
import { MovieGenre } from "../entities/MovieGenre";
import type { SelectQueryBuilder } from "typeorm";

const repo = AppDataSource.getRepository(Movie)
const actorRepo = AppDataSource.getRepository(MovieActor)
const genreRepo = AppDataSource.getRepository(MovieGenre)

export class MovieService {
    static async getMovies(search: string, actorId?: number, genreId?: number, directorId?: number, runTime?: number) {
        let queryBuilder: SelectQueryBuilder<Movie> = repo.createQueryBuilder("movie")
            .leftJoinAndSelect("movie.director", "director")
            .leftJoinAndSelect("movie.movieActors", "movieActor")
            .leftJoinAndSelect("movieActor.actor", "actor")
            .leftJoinAndSelect("movie.movieGenres", "movieGenre")
            .leftJoinAndSelect("movieGenre.genre", "genre");

        if (search) {
            queryBuilder.andWhere(
                "movie.title LIKE :search OR movie.description LIKE :search OR movie.shortUrl LIKE :search",
                { search: `%${search}%` }
            );
        }

        if (actorId) {
            queryBuilder.andWhere("movieActor.actorId = :actorId", { actorId });
        }

        if (genreId) {
            queryBuilder.andWhere("movieGenre.genreId = :genreId", { genreId });
        }

        if (directorId) {
            queryBuilder.andWhere("movie.directorId = :directorId", { directorId });
        }

        if (runTime) {
            queryBuilder.andWhere("movie.runTime = :runTime", { runTime });
        }

        return await queryBuilder.getMany();
    }

    static async getMovieById(id: number) {
        const data = await repo.findOne({
            where: {
                movieId: id
            },
            relations: {
                director: true,
                movieActors: {
                    actor: true
                },
                movieGenres: {
                    genre: true
                }
            }
        })

        if (!data) {
            throw new Error('NOT_FOUND')
        }

        return data
    }

    static async getMovieByShortUrl(short: string) {
        const data = await repo.findOne({
            where: {
                shortUrl: short
            },
            relations: {
                director: true,
                movieActors: {
                    actor: true
                },
                movieGenres: {
                    genre: true
                }
            }
        })

        if (!data) {
            throw new Error('NOT_FOUND')
        }

        return data
    }

    static async syncNew() {
        const rsp = await axios.request<MovieModel[]>({
            url: 'https://app.cineplexx.rs/api/v2/movies',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            },
            params: {
                // date: new Date().toISOString().split('T')[0],
                location: 'all'
            }
        })

        for (let movie of rsp.data) {

            const existingMovie = await repo.findOne({
                select: {
                    movieId: true
                },
                where: {
                    internalId: movie.id
                }
            })

            // Movie not yet cached
            if (existingMovie == null) {

                // Retrieve director
                const director = await DirectorService.retrieveDirectorByName(movie.director)

                // Retrieve actors
                const actors: Actor[] = []
                for (let a of movie.actors) {
                    actors.push(await ActorService.retrieveActorByName(a))
                }

                // Retreive genres
                const genres: Genre[] = []
                for (let g of movie.genres) {
                    genres.push(await GenreService.retrieveGenreByName(g))
                }

                // Save movie first
                const savedMovie = await repo.save({
                    internalId: movie.id,
                    corporateId: movie.corporateFilmId,
                    directorId: director.directorId,
                    title: movie.title,
                    originalTitle: movie.titleOriginalCalculated,
                    description: movie.descriptionCalculated,
                    shortDescription: movie.descriptionShortCalculated,
                    poster: movie.posterImage,
                    startDate: movie.startDate,
                    shortUrl: movie.shortURL,
                    runTime: movie.runTime,
                    createdAt: new Date()
                })

                // Save genres
                for (let genre of genres) {
                    await genreRepo.save({
                        movieId: savedMovie.movieId,
                        genreId: genre.genreId
                    })
                }


                // Save actors
                for (let actor of actors) {
                    await actorRepo.save({
                        movieId: savedMovie.movieId,
                        actorId: actor.actorId
                    })
                }

            }
        }
    }

    static async getUniqueRunTimes(): Promise<number[]> {
        const runTimes = await repo.createQueryBuilder("movie")
            .select("DISTINCT movie.runTime", "runTime")
            .orderBy("movie.runTime", "ASC")
            .getRawMany();

        return runTimes.map(rt => rt.runTime);
    }
}