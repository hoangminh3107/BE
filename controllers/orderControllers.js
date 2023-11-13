const  {Order } = require('../models/orders');
const {History} = require('../models/history');
const { productModel } = require('../models/product.model');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({msg:  error.message }); 
    }
};
//

exports.createOrder = async (req, res) => {

  try {
      if (!req.body.userId || !req.body.productId || !req.body.quantity) {
          return res.status(400).json({ msg: 'Vui lòng cung cấp đủ thông tin: userId, productId, quantity' });
      }

      const product = await productModel.findById(req.body.productId).populate({path: 'restaurantId',select: 'name'});

      if (!product || !product.restaurantId) {
          return res.status(404).json({ msg: 'Không tìm thấy sản phẩm hoặc thông tin nhà hàng' });
      }

      console.log(product);
      const order = new Order({
          userId: req.body.userId,
          restaurantName: product.restaurantId.name,
          name: product.name,
          image: product.image,
          price: product.realPrice,
          quantity: req.body.quantity,
      });

      const newOrder = await order.save();

      const orderId = newOrder._id;

      const history = new History({
          userId: req.body.userId,
          orderId,
          restaurantName: product.restaurantId.name,
          price: product.realPrice,
          time: new Date(),
      });

      const saveHistory = await history.save();
      res.json(saveHistory);
  } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
  }
};
exports.getRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },
        },
      },
    ]);
    if (result.length === 0) {
      return res.status(404).json({ msg: 'Không có đơn hàng' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};