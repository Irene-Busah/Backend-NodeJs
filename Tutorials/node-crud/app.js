require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')


const app = express();
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

// This allows only a specific url to access this backend
var corsOptions = {
    origin: 'http://example.com', // use can enable multiple urls using a list
    optionsSuccessStatus: 200
}


// Middleware for json and urlencoded(to enable the use of forms to add data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));


// Routes
app.use('/api/products', productRoute)

// GET Requests
app.get('/', (req, res) => {
    // throw new Error('Testing error functions')
    res.send('Welcome to Node & Express CRUD with MongoDB ')
})

app.use(errorMiddleware);

// Database Connection
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})
