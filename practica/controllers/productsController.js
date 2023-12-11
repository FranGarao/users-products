const models = require("../models/productsModels");
const model = require("../models/usersModel");
const { val, validationResult } = require("express-validator");
const controller = {
  getList: (req, res) => {
    const products = models.findAll();
    res.render("productsList", { products });
  },
  getCreate: (req, res) => {
    console.log(req.query);
    res.render("createProduct", { errors: req.query });
  },
  postProduct: (req, res) => {
    const result = validationResult(req);
    const queryArray = result.errors.map(
      (error) => "&" + error.path + "=" + error.msg
    );
    const queryString = queryArray.join("");
    console.log(queryString);
    if (result.errors.length > 0) {
      //hay que agregar el ?querystring al final para poder ingresar a la ruta debido a la autenticacion (usertype)
      res.redirect("/products/create?" + queryString);
      return;
    }
    const fileNames = req.files.map((file) => file.filename);
    const newProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      img: fileNames,
    };
    models.postProduct(newProduct);
    res.redirect("/products/list");
  },
  getDetail: (req, res) => {
    const id = req.params.id;
    const products = models.findAll();
    const product = products.find(
      (product) => parseInt(product.id) === parseInt(id)
    );
    res.render("productDetail", { product });
  },
  getEdit: (req, res) => {
    const product = models.findById(req.params.id);

    res.render("editProduct", { product });
  },
  delete: (req, res) => {
    const destroy = models.destroy(Number(req.params.id));
    res.redirect("/products/list");
  },
  updateProduct: (req, res) => {
    let updatedProduct = {
      id: Number(req.params.id),
      ...req.body,
    };
    models.updateProduct(updatedProduct);
    res.redirect("/products/" + req.params.id + "/detail");
  },
};

module.exports = controller;
