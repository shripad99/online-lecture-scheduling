const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { _id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json('No user found');
        }
        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) {
            return res.status(400).json('Wrong Credentials!');
        }
        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: others });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;