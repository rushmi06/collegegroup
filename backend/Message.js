const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, default: '' },
    body: { type: String, required: true },
    date: { type: String, default: new Date().toISOString() }, // Set default value to current date
    sender: { type: String, required: true },
    receivers: { type: Array, required: true }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
