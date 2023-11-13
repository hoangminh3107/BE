var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/addProduct", function (req, res, next) {
  res.render("product/addProduct", { title: "Express" });
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

module.exports = router;
