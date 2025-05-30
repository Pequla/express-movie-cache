import dotenv from "dotenv"
import { DataSource } from "typeorm";
import { Actor } from "./entities/Actor";
import { Director } from "./entities/Director";
import { Genre } from "./entities/Genre";
import { Movie } from "./entities/Movie";
import { MovieActor } from "./entities/MovieActor";
import { MovieGenre } from "./entities/MovieGenre";

// Connecting to database
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Movie, Actor, Director, Genre, MovieActor, MovieGenre
    ],
    logging: false,
})