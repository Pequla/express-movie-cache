import { AppDataSource } from "../db";
import { Movie } from "../entities/Movie";
import { filter } from "../utils";

const repo = AppDataSource.getRepository(Movie)

export class MovieService {
    static async getMovies(search: string) {
        return await repo.find({
            where: [
                {
                    title: filter(search)
                },
                {
                    description: filter(search)
                }
            ]
        })
    }

    static async getMovieById(id: number) {
        const data = await repo.findOne({
            where: {
                movieId: id
            }
        })

        if (!data) {
            throw new Error('NOT_FOUND')
        }

        return data
    }

    static async retrieveGenreByInternalId(id: string, model: Movie) {
        const data = await repo.findOne({
            where: {
                internalId: id
            }
        })

        if (data)
            return data

        return await repo.create()
    }
}