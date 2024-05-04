import express from "express";
import bodyParser from "body-parser";
import { request } from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// static files configuration
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})


// post request for the signup page
app.post("/", (req, res) => {
    let lname = req.body.lname;
    let fname = req.body.fname;
    let email = req.body.email;
    console.log(fname, lname, email);
})


app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
})
