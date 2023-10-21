const { default: mongoose } = require("mongoose");
var db = require("./db");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: [],
    description:{ type: String, required: false },
    number:  { type: Number, required: false },
    address: { type: String, required: false },
    idCategory: String,
    idDiscount: String,
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
