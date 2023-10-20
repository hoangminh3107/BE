const {History} = require('../models/history');
const Order = require('../models/orders');

exports.creatHistory = async (userId, orderId, restaurantName, price) => {
    try {
        const history = new History({
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
        const history = await History.find();
        res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId || userId.length !== 24) {
            return res.status(400).json({ msg: 'ID người dùng không hợp lệ' });
        }
        
        const userHistory = await History.find({ userId });
        
        if (!userHistory || userHistory.length === 0) {
            return res.status(404).json({ msg: 'Không tìm thấy lịch sử mua hàng cho người dùng này' });
        }
        res.json(userHistory);
    } catch (error) {
    console.error('Lỗi khi truy vấn lịch sử mua hàng:', error);
    return res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
};

exports.deleteHistory = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deleted = await History.findOneAndDelete({orderId});
        if (!deleted) {
            return res.status(404).json({ msg: 'Không tìm thấy lịch sử mua hàng' });
        }
        res.json(deleted)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}