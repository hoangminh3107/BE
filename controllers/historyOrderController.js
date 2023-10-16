const HistoryOrder = require('../models/history');

exports.getHistoryOrder = async (req, res) => {
    try {
        const history = await HistoryOrder.find();
        res.json(history)
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};

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