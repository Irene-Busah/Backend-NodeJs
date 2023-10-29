import express from "express";
import axios from "axios";


const app = express()
const PORT = 3000

app.use(express.static("public"))

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://tasty.p.rapidapi.com/recipes/list', {
            headers: {

            },
            params: {
                from: '0',
                size: '20',
                tags: 'under_30_minutes'
            }
        })
        const result = response.data
        // console.log(JSON.stringify(result))
        res.render('index.ejs', { content: result.results })
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})




// server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
