const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: String, required: true},
    description:{type: String, required: true},
    image: {type: String, required: true},
    startDate: {type: String, required: true},
    batches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'}],
});

module.exports = mongoose.model('Course', courseSchema);