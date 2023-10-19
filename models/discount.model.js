const { default: mongoose } = require("mongoose");
var db = require("./db");
const discountSchema = new mongoose.Schema(
  {
    priceDiscount: {
      type: Number,
      require: true,
    },
    idVoucher: { type: mongoose.Schema.ObjectId, ref: "voucherModel" },
    idUser: { type: mongoose.Schema.ObjectId, ref: "userModel" },

    money_limit: Number,
  },
  {
    collection: "discounts",
    timestamps: true,
  }
);
discountModel = db.mongoose.model("discountModel", discountSchema);
module.exports = {
  discountModel,
};
