var express = require("express");
const session = require("express-session");
const { yeu_cau_dang_nhap } = require("../middleware/checklogin");
var product = require("../controllers/product.controller");
var order = require("../controllers/orderControllers");
var router = express.Router();

/* GET home page. */
router.get("/", yeu_cau_dang_nhap);
router.get("/addProduct", function (req, res, next) {
  res.render("product/addProduct", { title: "Express", req: req });
});
router.get("/showProduct", function (req, res, next) {
  res.render("product/showProduct", { title: "Express" });
});
router.get("/editProduct", function (req, res, next) {
  res.render("product/editProduct", { title: "Express" });
});
router.get("/home", function (req, res, next) {
  res.render("home", { title: "Express" });
});
router.get("/revenue", function (req, res, next){
  res.render("revenue/showrevenue", {title: "Express", req: req});
});

router.get("/listproduct", product.getListProduct);
router.get("/orderstatistics", order.getOrdersWeb);

module.exports = router;
