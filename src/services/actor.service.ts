import { AppDataSource } from "../db";
import { Actor } from "../entities/Actor";
import { filter } from "../utils";

const repo = AppDataSource.getRepository(Actor)

export class ActorService {
    static async getActors(search: string) {
        return await repo.find({
            where: {
                name: filter(search)
            }
        })
    }

    static async getActorById(id: number) {
        const data = await repo.findOne({
            where: {
                actorId: id
            }
        })

        if (!data) {
            throw new Error('NOT_FOUND')
        }

        return data
    }

    static async retrieveActorByName(name: string) {
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