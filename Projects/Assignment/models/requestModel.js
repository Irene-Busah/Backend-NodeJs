const mongoose = require('mongoose')


const requestSchema = mongoose.Schema({
    title: { type: String, required: true },
    requestType: { type: String, required: true, enum: ['Academic', 'Administrative'] },
    description: { type: String, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
