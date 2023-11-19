var express = require("express");
const router = express.Router();
const multer = require("multer");
var apiU = require("../controllers/user.controllers");
var apiOder = require("../controllers/orderControllers");
var apiHistory = require("../controllers/historyOrderController");
var apiSlider = require("../controllers/slider.controller");
var apiComment = require("../controllers/comment.controller");
var apiRestaurant = require("../controllers/restautant.controller");
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
      console.error("Lỗi: req.session.user không tồn tại.");
      return res.status(401).json({ msg: "Không có thông tin nhà hàng" });
    }
    next();
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhà hàng:", error);
    return res.status(500).json({ msg: "Lỗi máy chủ nội bộ" });
  }
};
router.get("/revenueByTime", getRestaurantInfo, apiOder.getRevenueByDate);
 
router.get("/revenue", getRestaurantInfo, apiOder.getRevenue);
router.get("/order/:userId", apiOder.getOrdersByUser);
router.get("/revenue", getRestaurantInfo, apiOder.getRevenue);

// lịch sủ mua hàng
router.post("/history/create", apiHistory.createOrderSuccess);
router.get("/history", apiHistory.getHistory);
router.get("/ordersByUser/:userId", apiHistory.getUserHistory);
router.delete("/history/delete", apiHistory.deleteHistory);
router.delete("/history/deleteAll", apiHistory.deleteHistoryAll);
router.get("/update-order-status/:orderId", apiHistory.updateOrderStatusByRestaurant);
//slider
router.get("/slider/getAll", apiSlider.getSliders);
//comment
router.get("/comment/getAll", apiComment.getComment);
router.post("/comment/create", apiComment.postComment);

//restaurant
router.get("/restaurant/getAll", apiRestaurant.getRestaurants);
router.post("/restaurant/create", apiRestaurant.createRestaurant);
router.get("/restaurant/:id", apiRestaurant.getInfoRestaurantById);

router.post("/restaurant/delete/:id", apiRestaurant.deleteRestaurant);
//products
router.get("/product/id/:id", apiProduct.getProduct);
router.get("/product/suggest", apiProduct.getSuggest);
router.post("/product/getbyname", apiProduct.getProductByName);
router.get(
  "/product/getProductsInRestaurant/:id",
  apiProduct.getProductInRestaurant
);

router.post(
  "/product/addProduct",
  upload.single("image"),
  apiProduct.addProduct
);

module.exports = router;
