import { Router } from "express"
import { ActorService } from "../services/actor.service"
import { retrieveIdFromPath, sendErrorResponse } from "../utils"
import { DirectorService } from "../services/director.service"

export const DirectorRoute = Router()

DirectorRoute.get('/', async (req, res) => {
    try {
        const search = req.query.search as string
        res.json(await DirectorService.getDirectors(search))
    } catch (e) {
        sendErrorResponse(res)
    }
})

DirectorRoute.get('/:id', async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await DirectorService.getDirectorById(id))
    } catch (e) {
        sendErrorResponse(res)
    }
})