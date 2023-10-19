const { default: mongoose } = require("mongoose");
var db = require("./db");

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "categories",
    timestamps: true,
  }
);
categoryModel = db.mongoose.model("categoryModel", categorySchema);
module.exports = {
  categoryModel,
};
