import axios from "axios";
import express from "express";
import { AppDataSource } from "./db";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
import { notFoundResponse } from "./utils";

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

app.use('/api/actor', UserRoute)

// Default not found page
app.get('*', function (req, res) {
    notFoundResponse(res)
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

axios.request({
    url: 'https://app.cineplexx.rs/api/v2/movies?date=2025-03-03&location=all',
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
    }
}).then(rsp=>{
    console.log(rsp.data)
})




//https://app.cineplexx.rs/api/v3/moviesweb/HO00014952/sessions?location=all