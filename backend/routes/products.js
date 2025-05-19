const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// List all products (public)
router.get('/', async (req, res) => {
    res.json(await Product.find());
});

// Create product (admin only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    res.json(await Product.create(req.body));
});

// Update product (admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete product (admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
});

module.exports = router;