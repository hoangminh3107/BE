var productModel = require("../models/product.model");
const fs = require("fs");
exports.getSuggest = async (req, res, next) => {
  try {
    let list = await productModel.productModel.find();
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "Lấy dữ liệu thành công" });
    } else {
      return res.status(400).json({ msg: "Không có dữ liệu" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productModel.productModel.findById(req.params.id);

    if (!product) {
      return res.status(204).json({ msg: "Sản phẩm không tồn tại" });
    }

    res.status(200).json(product);
  } catch (error) {
    return res.status(204).json({ msg: error.message });
  }
};
exports.getProductByName = async (req, res, next) => {
  const productName = req.body.name;
  try {
    const products = await productModel.productModel.find({
      name: { $regex: productName, $options: "i" },
    });

    if (products.length === 0) {
      return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào." });
    }

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.addProduct = async (req, res, next) => {
  const imageFilePath = req.body.image;

  fs.readFile(imageFilePath, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Dữ liệu ảnh sẽ nằm trong biến 'data' dưới dạng buffer.
      const base64Image = data.toString("base64");
      console.log(base64Image);
      // Bây giờ bạn có thể sử dụng biến 'base64Image' trong ứng dụng của bạn.
    }
  });
};
