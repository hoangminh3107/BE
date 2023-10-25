var express = require("express");
var router = express.Router();
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

//user
router.get("/users", apiU.listUser);
router.post("/users/register", apiU.register);
router.post("/users/login", apiU.login);
router.post("/users/update/:id", apiU.update);

// đơn hàng
router.get("/order", apiOder.getOrders);
router.post("/add/order", apiOder.createOrder);

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


module.exports = router;
