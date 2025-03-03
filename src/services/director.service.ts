import { AppDataSource } from "../db";
import { Director } from "../entities/Director";
import { filter } from "../utils";

const repo = AppDataSource.getRepository(Director)

export class DirectorService {
    static async getDirectors(search: string) {
        return await repo.find({
            where: {
                name: filter(search)
            }
        })
    }

    static async getDirectorById(id: number) {
        const data = await repo.findOne({
            where: {
                directorId: id
            }
        })

        if (!data) {
            throw new Error('NOT_FOUND')
        }

        return data
    }

    static async retrieveDirectorByName(name: string) {
        const data = await repo.findOne({
            where: {
                name: name
            }
        })

        if (data)
            return data

        return await repo.create({
            name: name,
            createdAt: new Date()
        })
    }
}