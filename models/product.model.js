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
    restaurantId: { type: mongoose.Schema.ObjectId, ref: "restaurantModel" },
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
