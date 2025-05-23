const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
        }
    ],
    total: Number,
    status: { type: String, enum: ['Pending', 'Confirmed', 'Sent', 'Declined'], default: 'Pending' },
    location: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);