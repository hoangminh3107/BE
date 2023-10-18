const HistoryOrder = require('../models/history');
const {Order} = require('../models/orders');

exports.getHistoryOrder = async (req, res) => {
    try {
        const history = await HistoryOrder.find();
        res.json(history)
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};
//lấy lịch sử theo id người đặt
exports.getHistoryUserOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userHistoryOrders = await Order.find({ userID: userId});
        res.json(userHistoryOrders);
    } catch (error) {
        console.error('Lỗi truy vấn lịch sử đơn hàng:', error);
        return res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
    }
}

exports.deleteHistoryOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteHistory = await HistoryOrder.findOneAndDelete({ id });
        if (!deleteHistory) {
            return res.status(404).json({msg: 'Không tìm thấy lịch sử mua hàng'})
        }
        res.json(deleteHistory);
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
}