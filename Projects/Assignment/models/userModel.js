const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a username"]
    },
    email: {
        type: String,
        required: [true, "Please enter a email address"],
        unique: [true, "Email already exists"]
    },
    role: {
        type: String,
        enum: ['Student', 'Facilitator', 'Team Lead'],
        required: [true, "Select your Role"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }
},
    {
        timestamps: true,
    }
)



module.exports = mongoose.model("User", userSchema)

