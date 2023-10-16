var express = require("express");
var router = express.Router();
var apiU = require("../controllers/user.controllers");
var apiOder = require("../controllers/orderControllers");
var apiHistory = require("../controllers/historyOrderController");
var apiVoucher = require("../controllers/voucher.controller");
router.get("/users", apiU.listUser);
router.post("/users/register", apiU.register);
router.post("/users/login", apiU.login);

// đơn hàng
router.get("/order", apiOder.getOrders);
router.post("/add/order", apiOder.createOrder);

// lịch sủ mua hàng
router.get("/history", apiHistory.getHistoryOrder);
router.delete("/history/delete", apiHistory.deleteHistoryOrder);

//vouchers
router.get("/voucher/getAll", apiVoucher.getVouchers);
router.post("/voucher/create", apiVoucher.postVoucher);

module.exports = router;
