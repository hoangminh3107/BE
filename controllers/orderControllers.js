const  {Order } = require('../models/orders');
const {History} = require('../models/history');

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
      // Không cần sử dụng req.user._id nếu bạn không yêu cầu xác thực token
      // Thay vào đó, bạn có thể xác định userId dựa trên yêu cầu hoặc các thông tin khác
      // Ví dụ: const userId = req.body.userId;

      // Tạo đơn hàng mà không sử dụng req.user._id
      const order = new Order({
          userId: req.body.userId,  // Thay đổi cách bạn xác định userId tại đây
          restaurantName: req.body.restaurantName,
          name: req.body.name,
          image: req.body.image,
          price: req.body.price,
          quantity: req.body.quantity,
      });
      const newOrder = order.save();

      const orderId = newOrder._id;

      const history = new History({
          userId: req.body.userId,  // Thay đổi cách bạn xác định userId tại đây
          orderId,
          restaurantName: req.body.restaurantName,
          price: req.body.price,
          time: new Date(),
      });
      const saveHistory = history.save();
      res.json(saveHistory);
  } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
  }
};