const path = require("path");
const fs = require("fs");

const models = {
  fileRoute: path.join(__dirname, "../dataBase/products.json"),
  findAll: () => {
    const products = JSON.parse(fs.readFileSync(models.fileRoute));
    return products;
  },
  postProduct: (infoProduct) => {
    const products = models.findAll();
    const newProductId = products[products.length - 1].id;
    const newProduct = {
      id: newProductId + 1,
      ...infoProduct,
    };

    products.push(newProduct);
    fs.writeFileSync(models.fileRoute, JSON.stringify(products), "utf-8");
  },
  findById: (id) => {
    const products = models.findAll();
    const selectedProduct = products.find((product) => product.id == id);
    return selectedProduct;
  },
  destroy: (id) => {
    let products = models.findAll();

    products = products.filter(
      (product) => parseInt(product.id) !== parseInt(id)
    );

    fs.writeFileSync(models.fileRoute, JSON.stringify(products), "utf-8");
    return id;
  },
  updateProduct: (updatedProduct) => {
    let products = models.findAll();

    const prodIndex = products.findIndex(
      (product) => product.id == updatedProduct.id
    );

    products[prodIndex] = updatedProduct;

    fs.writeFileSync(models.fileRoute, JSON.stringify(products), "utf-8");
    return updatedProduct;
  },
};

module.exports = models;
