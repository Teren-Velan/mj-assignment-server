const Product = require("../models/Product.model");
const cloudinary = require("../utils/cloudinary");

//create api
exports.create = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  const product = new Product({
    sku: req.body.sku,
    title: req.body.title,
    image: result.url,
    user: req.user._id,
  });
  product
    .save()
    .then((result) => {
      return res.status(201).json({
        message: "Created product successfully",
        result,
      });
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({
        error: { message: err },
      });
    });
};
//update api
exports.update = async (req, res, next) => {
  let id = req.params.id;

  let variables = {};

  if (req?.file?.path) {
    variables.image = req.file.path;
  }
  if (req.body.sku) {
    variables.sku = req.body.sku;
  }
  if (req.body.title) {
    variables.title = req.body.title;
  }

  await Product.findByIdAndUpdate(id, variables, {
    returnOriginal: false,
    new: true,
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: {
            message: `Update unsuccessfull for product with id:${id}`,
          },
        });
      } else {
        return res.status(201).json({
          message: "Updated product successfully",
          updatedProductDetail: result,
        });
      }
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({
        error: err,
      });
    });
};
//delete api
exports.remove = async (req, res, next) => {
  let id = req.params.id;
  await Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Delete unsuccessfull for product with id:${id}`,
        });
      } else {
        return res.status(201).json({
          message: "Deleted product successfully",
          deletedProduct: result,
        });
      }
    })
    .catch((err) => {
      console.log({ err });
      return res.status(500).json({
        error: err,
      });
    });
};
//fetch all api
exports.fetchAllProducts = async (req, res, next) => {
  await Product.find({ user: req.user._id })
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
};
