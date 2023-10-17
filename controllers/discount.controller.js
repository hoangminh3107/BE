var discountModel = require("../models/discount.model");
exports.getDiscounts = async (req, res, next) => {
  try {
    let list = await discountModel.discountModel
      .find()
      .populate("idVoucher")
      .exec();
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "Lấy  dữ liệu voucher thành công" });
    } else {
      return res.status(400).json({ msg: "Không có dữ liệu" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.postDiscount = async (req, res, next) => {
  console.log(req.body);
  try {
    const discount = new discountModel.discountModel(req.body);

    let new_discount = await discount.save();

    return res.status(200).json({ discount: new_discount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
