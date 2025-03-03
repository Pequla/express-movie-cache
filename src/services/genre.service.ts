import { AppDataSource } from "../db";
import { Genre } from "../entities/Genre";
import { filter } from "../utils";

const repo = AppDataSource.getRepository(Genre)

export class GenreService {
    static async getGenres(search: string) {
        return await repo.find({
            where: {
                name: filter(search)
            }
        })
    }

    static async getGenreById(id: number) {
        const data = await repo.findOne({
            where: {
                genreId: id
            }
        })

        if (!data) {
            throw new Error('NOT_FOUND')
        }

        return data
    }

    static async retrieveGenreByName(name: string) {
        const data = await repo.findOne({
            where: {
                name: name
            }
        })

        if (data)
            return data

        return await repo.save({
            name: name,
            createdAt: new Date()
        })
    }
}