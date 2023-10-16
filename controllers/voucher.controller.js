var voucherModel = require("../models/voucher.model");

exports.getVouchers = async (req, res, next) => {
  try {
    let list = await voucherModel.voucherModel.find();
    console.log(list);
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "Lấy  dữ liệu voucher thành công" });
    } else {
      return res.status(204).json({ msg: "Không có dữ liệu" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.postVoucher = async (req, res, next) => {
  console.log(req.body);
  try {
    const voucher = new voucherModel.voucherModel(req.body);

    let new_voucher = await voucher.save();

    return res.status(200).json({ voucher: new_voucher });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
