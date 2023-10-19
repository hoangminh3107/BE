const { default: mongoose } = require("mongoose");
var db = require("./db");

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    listFood: [],
    image: String,
    address: String,
    timeon: String,
    timeoff: String,
    idDiscount: String,
    email: String,
    phone: String,
  },
  {
    collection: "restaurants",
    timestamps: true,
  }
);
restaurantModel = db.mongoose.model("restaurantModel", restaurantSchema);
module.exports = {
  restaurantModel,
};
