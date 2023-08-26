/** @type {import("mongoose").Model} */
const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the contact name"]
        },
        email: {
            type: String,
            required: [true, "Please enter the email address"]
        },
        phone: {
            type: String,
            required: [true, "Please enter the phone number"]
        }

    },
    {
        timestamps: true
    }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
