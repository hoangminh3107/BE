var express = require("express");
const session = require("express-session");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/addProduct", function (req, res, next) {
  res.render("product/addProduct", { title: "Express" });
});
router.get("/home", function (req, res, next) {
  res.render("home", { title: "Express" });
});

module.exports = router;
