const router = require("express").Router();
const Lecture = require("../models/lecture");

// Create a new lecture
router.post("/", async (req, res) => {
    const { courseId, instructorId, date, details } = req.body;
    try {
        const lectureDate = new Date(date);

        // Ensure the instructor doesn't already have a lecture on this date
        const existingLecture = await Lecture.findOne({
            instructorId,
            date: {
                $gte: new Date(lectureDate.setHours(0, 0, 0, 0)), // Start of the day
                $lt: new Date(lectureDate.setHours(23, 59, 59, 999)) // End of the day
            }
        });

        if (existingLecture) {
            return res.status(400).json({ error: "Instructor already has a lecture on this date" });
        }

        const lecture = new Lecture({ courseId, instructorId, date: lectureDate, details });
        await lecture.save();
        res.status(201).json(lecture);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get lectures for an instructor
router.get("/", async (req, res) => {
    const { instructorId } = req.query; // Changed from params to query
    try {
        if (!instructorId) {
            return res.status(400).json({ error: "Instructor ID is required" });
        }

        const lectures = await Lecture.find({ instructorId }).populate("courseId", "name startDate");
        res.json(lectures);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
