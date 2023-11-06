var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
<<<<<<< HEAD
router.get("/addProduct", function (req, res, next) {
  res.render("product/addProduct", { title: "Express" });
});
router.get("/home", function (req, res, next) {
  res.render("home", { title: "Express" });
=======
router.get('/home', function(req, res, next) {
  res.render('reataurant/', { title: 'Express' });
>>>>>>> db2ae524413495efe3cde53ac8597f0709f2e097
});

module.exports = router;
