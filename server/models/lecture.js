const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    instructorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true},
    date: {type: Date, required: true},
    details: {type: String, required: true},
})

lectureSchema.pre("save", async function (next){
    const Lecture = mongoose.model("Lecture");

    const existingLecture = await Lecture.findOne({
        instructorId: this.instructorId,
        date: this.date
    });

    if(existingLecture){
        const error = new Error("Instructor already has a lecture scheduled on this date.");
        return next(error);
    }
    next();
})

module.exports = mongoose.model('Lecture', lectureSchema);