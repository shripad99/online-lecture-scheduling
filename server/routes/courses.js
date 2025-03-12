const router = require("express").Router();
const Course = require("../models/course");

// Create a new course
router.post("/", async (req, res) => {
    const { name, level, description, image, startDate } = req.body;
    try {
        if (!startDate) {
            return res.status(400).json({ error: "Start date is required" });
        }

        const formattedStartDate = new Date(startDate); // Ensure it's stored as Date type

        const course = new Course({ name, level, description, image, startDate: formattedStartDate, batches: [] });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
});

// Get all courses
router.get("/", async (req, res) => {
    try {
      const courses = await Course.find(); // Fetch all courses
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
});

module.exports = router;
