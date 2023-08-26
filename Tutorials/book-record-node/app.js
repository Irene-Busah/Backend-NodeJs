const express = require('express');
const mongoose = require('mongoose');
const bookRoute = require('./routes/bookRoute')

const app = express();
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
    console.log('Welcome to My Book Record Application');
})


app.use('/api', bookRoute)



// Database connection
mongoose.connect('MONGODB_URL').then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
})





