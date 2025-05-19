const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        res.json({ msg: 'User registered' });
    } catch (err) {
        res.status(400).json({ msg: 'Error registering user', err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { user: { id: user._id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ msg: 'Login error', err });
    }
});

module.exports = router;