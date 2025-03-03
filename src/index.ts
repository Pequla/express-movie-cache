import express from "express";
import { AppDataSource } from "./db";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
import { notFoundResponse } from "./utils";
import { ActorRoute } from "./routes/actor.route";
import { GenreRoute } from "./routes/genre.route";
import { DirectorRoute } from "./routes/director.route";
import { MovieRoute } from "./routes/movie.route";

// Setting up web server
const app = express()
app.use(express.json())
app.use(morgan('short'))
app.use(cors())

// Reading env variables
dotenv.config();
const port = Number(process.env.SERVER_PORT);

// Connect to database
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database');
        app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
    })
    .catch((error) => console.log(error))

app.use('/api/actor', ActorRoute)
app.use('/api/genre', GenreRoute)
app.use('/api/director', DirectorRoute)
app.use('/api/movie', MovieRoute)

// Default not found page
app.get('*', function (req, res) {
    notFoundResponse(res)
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

//https://app.cineplexx.rs/api/v3/moviesweb/HO00014952/sessions?location=all