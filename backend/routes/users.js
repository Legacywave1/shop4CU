const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// List all users (admin only)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    res.json(await User.find({}, '-password'));
});

// Delete user (admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
});

module.exports = router;