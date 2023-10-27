import express from "@types/express";
import bodyParser from "@types/body-parser";

const app = express()
const PORT = 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))




app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`)
})
