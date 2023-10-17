const { default: mongoose } = require("mongoose");
var db = require("./db");
const discountSchema = new mongoose.Schema(
  {
    priceDiscount: {
      type: Number,
      require: true,
    },
    idVoucher: { type: mongoose.Schema.ObjectId, ref: "voucherModel" },

    money_limit: Number,
  },
  {
    collection: "discounts",
  }
);
discountModel = db.mongoose.model("discountModel", discountSchema);
module.exports = {
  discountModel,
};
