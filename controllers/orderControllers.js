const { Order } = require('../models/orders');
const {userModel} = require('../models/users.model');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};


exports.createOrder = async (req, res) => {
    const { userId, name, image, price, quantity} = req.body;
    if (!userId) {
        return res.status(400).json({ msg: 'Thiếu userId' });
    }
    try {
        const user = await userModel.findById({_id : userId});
        if (!user) {
            return res.status(404).json({msg: 'người dùng không tồn tại'});
        }
        const order = new Order({
            userId,
            name,
            image,
            price,
            quantity,
        });
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    // orderData.userId = req.user.id;
    // const order = new Order(req.body);
    // try {
    //     const newOrder = await order.save(); 
    //     res.status(201).json(newOrder);
    // } catch (error) {
    //     return res.status(500).json({ msg: error.message });
    // }
};
