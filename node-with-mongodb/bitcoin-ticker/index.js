import express from "express";
import bodyParser from "body-parser";
import request from "request";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// External API isn't working
app.post("/", (req, res) => {
    const API_URL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";
    request(API_URL, (error, response, body) => {
        let data = JSON.parse(body);
        let price = data.last;

        res.send(`<h1>The price of Bitcoin is $${price}`)
    })
})



app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
})

