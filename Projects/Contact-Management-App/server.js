const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const contactRouter = require('./routes/contactRoutes')
const userRouter = require("./routes/userRoutes")
const errorHandler = require('./middleware/errorHandler')


const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI

app.use(express.json())
// Routes
app.use('/api/contacts', contactRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)


mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
}).catch((error) => {
    console.log(error)
})

