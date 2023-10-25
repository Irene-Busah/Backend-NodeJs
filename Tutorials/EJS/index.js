import express from "express";

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
let weekend = false

const checkWeek = (req, res, next) => {
    const d = new Date();
    if (d.getDay() === 0 || d.getDay() === 6) {
        weekend = true;
    }
    next()
}

app.use(checkWeek)

// routes
app.get('/', (req, res) => {
    res.render('index', { 'weekend': weekend })
})


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
