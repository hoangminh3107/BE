var productModel = require("../models/product.model");


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
          return res.status(204).json({ msg: 'Sản phẩm không tồn tại' });
        }
      
        res.status(200).json(product);
      } catch (error) {
        return res.status(204).json({ msg: error.message });
      }
};
