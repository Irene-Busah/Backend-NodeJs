import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello!");
})

app.get("/contact", (req, res) => {
    res.send("Contact me at: i.busah123@gmail.com")
})

app.get("/about", (req, res) => {
    res.send("I am Irene Busah, a Software & Data Engineer. I love programming!")
})

app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
})

