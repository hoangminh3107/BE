const  Order  = require('../models/orders');
const { createHistory } = require('../controllers/historyOrderController');
const userModel = require('../models/users.model');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { userId, restaurantName, name, image, price, quantity } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Người dùng không tồn tại' });
        }
        const order = new Order({
            userId,
            restaurantName,
            name,
            image,
            price,
            quantity,
        });
        const newOrder = await order.save();
        const savedHistory = await createHistory(userId, newOrder._id, restaurantName, price);

        if (!savedHistory) {
            return res.status(500).json({ msg: 'Lỗi khi tạo lịch sử mua hàng' });
        }
        res.json(newOrder);
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
};
