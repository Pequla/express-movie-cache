import { Router } from "express"
import { retrieveIdFromPath, sendErrorResponse } from "../utils"
import { GenreService } from "../services/genre.service"

export const GenreRoute = Router()

GenreRoute.get('/', async (req, res) => {
    try {
        const search = req.query.search as string
        res.json(await GenreService.getGenres(search))
    } catch (e) {
        sendErrorResponse(res)
    }
})

GenreRoute.get('/:id', async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await GenreService.getGenreById(id))
    } catch (e) {
        sendErrorResponse(res)
    }
})