const { default: mongoose } = require("mongoose");
var db = require("./db");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: [],
    description: String,
    price: Number,
    idCategory: String,
    idDiscount: String,
  },
  {
    collection: "products",
  }
);
productModel = db.mongoose.model("productModel", productSchema);
module.exports = {
  productModel,
};
