import express from "express";
import bodyParser from "body-parser";
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

app.post("/", (req, res) => {
    let number_one = Number(req.body.num1);
    let number_two = Number(req.body.num2);

    const result = number_one + number_two;

    res.send(`<h2>The result of the calculations is ${result}</h2>`);
})

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", (req, res) => {
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);

    const result = weight / (height * height);

    // console.log(weight, height);

    res.send(`Your BMI is ${result}`)
})

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
})
