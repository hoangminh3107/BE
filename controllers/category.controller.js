var categoryModel = require("../models/category.model");

exports.getCategories = async (req, res, next) => {
  try {
    let list = await categoryModel.categoryModel.find();
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "Lấy  dữ liệu category thành công" });
    } else {
      return res.status(400).json({ msg: "Không có dữ liệu category" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = new categoryModel.categoryModel(req.body);

    let new_category = await category.save();

    return res.status(200).json({ category: new_category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
