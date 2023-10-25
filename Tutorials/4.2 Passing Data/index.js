import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs')
});

app.post("/submit", (req, res) => {
  const data = req.body

  const numLetters = data.fName.length + data.lName.length;
  console.log(numLetters)
  res.render("index.ejs", { numberOfLetters: numLetters })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
