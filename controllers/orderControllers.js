const { Order } = require('../models/orders');
const { History } = require('../models/history');
const { productModel } = require('../models/product.model');
const mongoose = require('mongoose');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
//lấy theo id 
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: 'Không tìm thấy đơn hàng cho người dùng này.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    res.status(500).json({ msg: 'Lỗi máy chủ nội bộ.' });
  }
};

exports.createOrder = async (req, res) => {

  try {
    if (!req.body.userId || !req.body.productId || !req.body.quantity) {
      return res.status(400).json({ msg: 'Vui lòng cung cấp đủ thông tin: userId, productId, quantity' });
    }

    const product = await productModel.findById(req.body.productId).populate({ path: 'restaurantId', select: 'name' });

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
      orderDate: new Date(),
    });

    const newOrder = await order.save();

    // const orderId = newOrder._id;

    // const history = new History({
    //   userId: req.body.userId,
    //   orderId,
    //   restaurantName: product.restaurantId.name,
    //   price: product.realPrice,
    //   time: new Date(),
    // });

    // const saveHistory = await history.save();
    // res.json(saveHistory);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
  }
};
exports.getRevenue = async (req, res) => {
  try {
    
    const loggedInUser = req.session.user;
    if (!loggedInUser) {
      return res.status(401).json({ msg: 'Nhà hàng chưa đăng nhập' });
    }
    console.log("tai khoan 1", loggedInUser);
    const restaurantId = loggedInUser._id;

    // Bắt đầu pipeline
    const resultAfterLookup = await Order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'name',
          foreignField: 'name',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: 'productInfo.restaurantId',
          foreignField: '_id',
          as: 'restaurantInfo',
        },
      },
      {
        $unwind: '$restaurantInfo',
      },
      {
        $group: {
          _id: '$restaurantInfo._id',
          restaurantName: { $first: '$restaurantInfo.name' },
          totalRevenue: {
            $sum: { $multiply: ['$price', '$quantity'] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          restaurantId: '$_id',
          restaurantName: 1,
          totalRevenue: 1,
          restaurantInfo: '$restaurantInfo',
        },
      },
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(restaurantId),
        },
      },
    
    ]);
    console.log('data', resultAfterLookup);
    if (resultAfterLookup.length === 0) {
      return res.status(404).json({ msg: 'Không có đơn hàng' });
    }

    res.status(200).json(resultAfterLookup);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.getRevenueByDate = async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ msg: 'Nhà hàng chưa đăng nhập' });
    }
    const restaurantId = user._id;
    const resultAfterLookup = await Order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'name',
          foreignField: 'name',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: 'productInfo.restaurantId',
          foreignField: '_id',
          as: 'restaurantInfo',
        },
      },
      {
        $unwind: '$restaurantInfo',
      },
      {
        $group: {
          _id: {
            restaurantId: '$restaurantInfo._id',
            orderDate: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$orderDate',
              },
            },
          },
          restaurantName: { $first: '$restaurantInfo.name' },
          totalRevenue: {
            $sum: { $multiply: ['$price', '$quantity'] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          restaurantId: '$_id.restaurantId',
          restaurantName: 1,
          orderDate: '$_id.orderDate',
          totalRevenue: 1,
        },
      },
      {
        $match: {
          'restaurantId': new mongoose.Types.ObjectId(restaurantId),
        },
      },
    ]);
    res.status(200).json(resultAfterLookup);
  } catch (error) {
    console.error('Lỗi khi lấy doanh thu:', error);
    return res.status(500).json({ msg: error.message });
  }
};

//web 
exports.getOrdersWeb = async (req, res) => {
    try {
      const orders = await Order.find().populate('userId', 'username');
      res.render("order/listorder", { list: orders, req: req });
    } catch (error) {
      console.log(error);
      res.render("/",{req:req});
    }
};