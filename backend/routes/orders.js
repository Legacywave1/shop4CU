const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// List orders for user/admin
router.get('/', auth, async (req, res) => {
    if (req.user.role === 'admin') {
        res.json(await Order.find().populate('user').populate('products.product'));
    } else {
        res.json(await Order.find({ user: req.user.id }).populate('products.product'));
    }
});

// Place an order (user)
router.post('/', auth, async (req, res) => {
    const order = new Order({ ...req.body, user: req.user.id });
    await order.save();
    res.json(order);
});

// Update order status (admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete order (admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
});

module.exports = router;