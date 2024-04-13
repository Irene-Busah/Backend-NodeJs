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




app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
})

