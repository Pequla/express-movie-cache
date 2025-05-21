import { Router } from "express"
import { retrieveIdFromPath, sendErrorResponse } from "../utils"
import { MovieService } from "../services/movie.service"

export const MovieRoute = Router()

MovieRoute.get('/', async (req, res) => {
    try {
        const search = req.query.search as string
        const actor = Number(req.query.actor)
        const genre = Number(req.query.genre)
        const director = Number(req.query.director)
        const runtime = Number(req.query.runtime)
        res.json(await MovieService.getMovies(search, actor, genre, director, runtime))
    } catch (e) {
        console.log(e)
        sendErrorResponse(res)
    }
})

MovieRoute.get('/runtime', async (req, res) => {
    try {
        res.json(await MovieService.getUniqueRunTimes())
    } catch (e) {
        sendErrorResponse(res)
    }
})

MovieRoute.post('/list', async (req, res) => {
    try {
        res.json(await MovieService.getMoviesByIds(req.body))
    } catch (e) {
        sendErrorResponse(res)
    }
})

MovieRoute.get('/short/:short', async (req, res) => {
    try {
        res.json(await MovieService.getMovieByShortUrl(req.params.short))
    } catch (e) {
        sendErrorResponse(res)
    }
})

MovieRoute.get('/:id', async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await MovieService.getMovieById(id))
    } catch (e) {
        sendErrorResponse(res)
    }
})

MovieRoute.post('/sync',async (req, res) => {
    try {
        await MovieService.syncNew()
        res.status(204).send()
    } catch (e) {
        console.log(e)
        sendErrorResponse(res)
    }
})