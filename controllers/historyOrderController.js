var historyModel = require("../models/history");
const { productModel } = require("../models/product.model");
const notify = require("../controllers/notify.controller");
exports.createOrderSuccess = async (req, res, next) => {
  console.log("dddjjdjd", req.body);
  try {
    const OrderSuccess = new historyModel.History(req.body);

    let new_OrderSuccess = await OrderSuccess.save();
    notify.postNotify(req.body);
    return res.status(200).json({ OrderSuccess: new_OrderSuccess });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await historyModel.History.find();
    res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ msg: "ID người dùng không hợp lệ" });
    }
    //
    const userHistory = await historyModel.History.find({ userId });

    if (!userHistory || userHistory.length === 0) {
      return res
        .status(404)
        .json({ msg: "Không tìm thấy lịch sử mua hàng cho người dùng này" });
    }
    res.json(userHistory);
  } catch (error) {
    console.error("Lỗi khi truy vấn lịch sử mua hàng:", error);
    return res.status(500).json({ msg: "Lỗi máy chủ nội bộ" });
  }
};

exports.deleteHistory = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const deleted = await History.findOneAndDelete({ orderId });
    if (!deleted) {
      return res.status(404).json({ msg: "Không tìm thấy lịch sử mua hàng" });
    }
    res.json(deleted);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.deleteHistoryAll = async (req, res) => {
  try {
    // Xóa tất cả các bản ghi trong mô hình History
    await historyModel.History.deleteMany({});

    res.json({ msg: "Tất cả lịch sử mua hàng đã được xóa" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// cập nhật trạng thái đơn hàng
exports.updateOrderStatusByRestaurant = async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  try {
    // Kiểm tra xem newStatus có giá trị hợp lệ hay không (0, 1, 2)
    if (![0, 1, 2].includes(newStatus)) {
      return res.status(400).json({ msg: "Trạng thái không hợp lệ." });
    }

    // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
    const updatedOrder = await historyModel.History.findByIdAndUpdate(
      orderId,
      { $set: { status: newStatus } },
      { new: true }
    );

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!updatedOrder) {
      return res.status(404).json({ msg: "Không tìm thấy đơn hàng" });
    }

    // Phản hồi dựa trên trạng thái mới
    switch (newStatus) {
      case 1:
        return res.json({ msg: "Đơn hàng đang chuẩn bị." });
      case 2:
        return res.json({ msg: "Đơn hàng đã giao." });
      default:
        return res.json({ msg: "Chờ xác nhận." });
    }
  } catch (error) {
    // Xử lý bất kỳ lỗi nào xuất hiện trong quá trình xử lý
    return res.status(500).json({ msg: error.message });
  }
};
