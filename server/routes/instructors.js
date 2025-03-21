const router = require("express").Router()
const Instructor = require("../models/instructor");
const User = require('../models/user');

// Get all instructors
router.get('/', async(req, res) =>{
    try {
        const instructors = await User.find({ role: 'instructor' }, 'username email');
        res.json(instructors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// add instructors
router.post('/', async(req, res) =>{
    try{
        const {name, email} = req.body;

        const existingInstructor = await Instructor.findOne({ email });
        if(existingInstructor){
            return res.status(400).json({error: 'Instructor already exists'});
        }
        const newInstructor = new Instructor({name, email});
        await newInstructor.save();
        res.status(201).json({ message: 'Instructor added successfully', instructor: newInstructor});
    }catch(err){
        res.status(500).json({ error: 'Server error' });
    }
})

// update instructors
router.put("/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        const { name, email } = req.body;
        
        const instructor = await Instructor.findById(id);
        if(!instructor){
            return res.status(404).json({ error: 'Instructor not found' });
        }

        if(email &&  email !== instructor.email){
            const existingInstructor = await Instructor.findOne({ email });
            if(existingInstructor){
                return res.status(400).json({ error: 'Email already in use by another instructor' });
            }
        }

        if (name) instructor.name = name;
        if (email) instructor.email = email;

        // Save the updated instructor
        await instructor.save();
        res.json({ message: 'Instructor updated successfully', instructor });
    }catch(err){
        res.status(500).json({ error: 'Server error' });
    }
})


module.exports = router;