var productModel = require("../models/product.model");

const firebase = require("../firebase/index.js");

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
  const nameFile = req.file.originalname;
  const blob = firebase.bucket.file(nameFile);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("finish", () => {
    const product = {
      ...req.body,
      realPrice: Number.parseInt(req.body.realPrice),
      discountPrice: Number.parseInt(req.body.discountPrice),
      quantityInStock: Number.parseInt(req.body.quantityInStock),
      description: "Mon an ngon",
      restaurantId: "6530cfe6eeadf379fd6a4c5d", //id nha hang
      image: `https://firebasestorage.googleapis.com/v0/b/datn-de212.appspot.com/o/${nameFile}?alt=media&token=d890e1e7-459c-4ea8-a233-001825f3c1ae`,
    };
    productModel.productModel.create(product).then(() => {
      res.json("them ok");
    });
  });
  blobWriter.end(req.file.buffer);
};
