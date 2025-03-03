import { Router } from "express"
import { ActorService } from "../services/actor.service"
import { retrieveIdFromPath, sendErrorResponse } from "../utils"

export const ActorRoute = Router()

ActorRoute.get('/', async (req, res) => {
    try {
        const search = req.query.search as string
        res.json(await ActorService.getActors(search))
    } catch (e) {
        sendErrorResponse(res)
    }
})

ActorRoute.get('/:id', async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await ActorService.getActorById(id))
    } catch (e) {
        sendErrorResponse(res)
    }
})