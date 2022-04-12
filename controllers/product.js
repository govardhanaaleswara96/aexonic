const productModel = require("../models/product");
const csv = require("csvtojson");

const createProduct = async (req, res) => {
  let csvData = await csv().fromFile(req.file.path);
  const productSkus = [];
  const formattedData = {};

  /**
   * Generating SKU from Product Name
   * If Incase we don't want product name to be uniq we can assign uniq SKU in csv itself for Every Product
   */
  csvData.forEach((ele) => {
    const sku = ele.product_name.replace(/\s/g, "_").toString().toLowerCase();
    productSkus.push(sku);
    formattedData[sku] = { ...ele, sku };
  });

  /**
   * Get all Existing Products
   */
  const existingProducts = await productModel
    .find({ sku: { $in: productSkus } })
    .lean();

  /**
   * this Variable Contains All promises of products required Update
   */
  const productsRequiredUpdatePromises = [];

  /**
   * This Variable Contains All the new Product Objects
   */
  const newProducts = [];

  /**
   * Logic to filter The Product required Update And Creation
   */
  productSkus.forEach((sku) => {
    const isProductExist = existingProducts.some((existingProduct) => {
      if (existingProduct.sku === sku) {
        productsRequiredUpdatePromises.push(
          productModel.findOneAndUpdate(
            { sku },
            {
              ...formattedData[sku],
            }
          )
        );
      }
      return existingProduct.sku === sku;
    });

    if (!isProductExist) {
      newProducts.push(formattedData[sku]);
    }
  });

  /**
   * Creation Of Products
   */
  if (newProducts.length > 0) {
    const newProduct = await productModel.insertMany(newProducts);
    res.status(201).json({
      message: "Product Created Successfully",
      data: newProduct,
    });
  }

  /**
   * updating Existing Products
   */
  if (productsRequiredUpdatePromises.length > 0) {
    const result = await Promise.all(productsRequiredUpdatePromises);
    res.status(201).json({
      message: "Product Updated Successfully",
      data: result,
    });
  }
};

module.exports = {
  createProduct,
};
