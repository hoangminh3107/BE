const HistoryOrder = require('../models/history');
const Order = require('../models/orders');

exports.creatHistory = async (userId, orderId, restaurantName, price) => {
    try {
        const history = new HistoryOrder({
            userId,
            orderId,
            restaurantName,
            price,
            time: new Date(),
        });
        const savedHistory = await history.save();
        return savedHistory;
    } catch (error) {
        console.error('Lỗi khi tạo lịch sử mua hàng:', error);
        return null;
    }
};
exports.getHistory = async (req, res) => {
    try {
        const history = await HistoryOrder.find();
        res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userHistory = await HistoryOrder.find({userId});
        res.json(userHistory);
    } catch (error) {
    console.error('Lỗi khi truy vấn lịch sử mua hàng:', error);
    return res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
};

exports.deleteHistory = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deleted = await HistoryOrder.findOneAndDelete({orderId});
        if (!deleted) {
            return res.status(404).json({ msg: 'Không tìm thấy lịch sử mua hàng' });
        }
        res.json(deleted)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}