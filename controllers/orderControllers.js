const Order = require('../models/orders');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await Order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};
