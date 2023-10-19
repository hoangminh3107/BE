const { default: mongoose } = require("mongoose");
var db = require("./db");

const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    date: String,
  },
  {
    collection: "vouchers",
    timestamps: true,
  }
);
voucherModel = db.mongoose.model("voucherModel", voucherSchema);
module.exports = {
  voucherModel,
};
