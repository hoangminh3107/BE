var express = require("express");
const router = express.Router();
const multer = require("multer");
var apiU = require("../controllers/user.controllers");
var apiOder = require("../controllers/orderControllers");
var apiHistory = require("../controllers/historyOrderController");
var apiVoucher = require("../controllers/voucher.controller");
var apiSlider = require("../controllers/slider.controller");
var apiDiscount = require("../controllers/discount.controller");
var apiComment = require("../controllers/comment.controller");
var apiRestaurant = require("../controllers/restautant.controller");
var apiCategory = require("../controllers/category.controller");
var apiProduct = require("../controllers/product.controller");

const upload = multer({ storage: multer.memoryStorage() });

//user
router.get("/users", apiU.listUser);
router.get("/users/info/:id", apiU.infoUser);
router.post("/users/register", apiU.register);
router.post("/users/login", apiU.login);
router.post("/users/update/:id", apiU.update);

// đơn hàng
router.get("/order", apiOder.getOrders);
router.post("/add/order", apiOder.createOrder);

const getRestaurantInfo = async (req, res, next) => {
  try {
    const user = req.session.user;
    if (user) {
      req.restaurant = user;
    } else {
      console.error('Lỗi: req.session.user không tồn tại.');
      return res.status(401).json({ msg: 'Không có thông tin nhà hàng' });
    }
    next();
  } catch (error) {
    console.error('Lỗi khi lấy thông tin nhà hàng:', error);
    return res.status(500).json({ msg: 'Lỗi máy chủ nội bộ' });
  }
};
router.get("/revenueByTime", getRestaurantInfo, apiOder.getRevenueByDate);
 
router.get("/revenue", getRestaurantInfo, apiOder.getRevenue);


// lịch sủ mua hàng
router.get("/history", apiHistory.getHistory);
router.delete("/history/delete", apiHistory.deleteHistory);
router.get("/ordersByUser/:userId", apiHistory.getUserHistory);
//vouchers
router.get("/voucher/getAll", apiVoucher.getVouchers);
router.post("/voucher/create", apiVoucher.postVoucher);
//slider
router.get("/slider/getAll", apiSlider.getSliders);

//discount
router.get("/discount/getAll", apiDiscount.getDiscounts);

//comment
router.get("/comment/getAll", apiComment.getComment);
router.post("/comment/create", apiComment.postComment);

//restaurant
router.get("/restaurant/getAll", apiRestaurant.getRestaurants);
router.post("/restaurant/create", apiRestaurant.createRestaurant);
router.post("/restaurant/delete/:id", apiRestaurant.deleteRestaurant);

//category
router.get("/category/getAll", apiCategory.getCategories);
router.post("/category/create", apiCategory.createCategory);

//products
router.get("/product/id/:id", apiProduct.getProduct);
router.get("/product/suggest", apiProduct.getSuggest);
router.post("/product/getbyname", apiProduct.getProductByName);
router.post(
  "/product/addProduct",
  upload.single("image"),
  apiProduct.addProduct
);

module.exports = router;
