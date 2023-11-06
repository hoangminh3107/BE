var express = require("express");
var router = express.Router();
var user = require("../controllers/user.controllers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/*Authorize*/
router.post("/signup", user.webregister);
router.post("/login", user.weblogin);

module.exports = router;
