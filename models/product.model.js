const { default: mongoose } = require("mongoose");
var db = require("./db");

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    quantityInStock: Number,
    price: Number,
    idCategory: { type: mongoose.Schema.ObjectId, ref: "categoryModel" },
    idDiscount: { type: mongoose.Schema.ObjectId, ref: "discountModel" },
    restaurantId: { type: mongoose.Schema.ObjectId, ref: "restaurantModel" },
    categoryId: { type: mongoose.Schema.ObjectId, ref: "categoryModel" },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
productModel = db.mongoose.model("productModel", productSchema);
module.exports = {
  productModel,
};
