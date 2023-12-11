const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/productsController");
const authMiddlewares = require("../middlewares/authenticMiddlewares");
//de express-validator me interesa agarrar la funcion body
const { body, validationResult } = require("express-validator");

//un array de middlewares, hay que pasarlo a carpeta middlewares y ponerlo en el file validations
const validations = [
  //chequeamos que title no este vacio
  body("title")
    .custom((value) => {
      if (!isNaN(value)) {
        throw new Error("El campo ingresado no puede estar vacio");
      }
      return true;
    })
    .isEmpty()
    .withMessage(" El campo ingresado no debe contener numeros"),
  //chequeamos que price no este vacio y que sea un numero
  body("price").isInt().withMessage("El campo ingresado debe ser un numero"),
];

//creamos el storage, seteamos el destination y el filename, inicializamos muylter pasandole el storage, pasamos el multer como segundo parametro al .post
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //aca ponemos la ruta donde queremos que se guarden la imagen
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  //aca le decimos con que nombre queremos que se guarden las imagenes
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// aca sabe multer como utilizar archivos
const upload = multer({ storage });

router.get("/list", controller.getList);

// router.post("/list", controller.postProduct);

//middleware de ruta como segundo parametro
router.get(
  "/create",
  //  authMiddlewares.checkAdmin,
  controller.getCreate
);

//aca le ponemos entre (el name del input en el que se van a subir las imagenes)
//el middleware de multer siempre va primero
router.post(
  "/create",
  [
    upload.any("img"),
    // authMiddlewares.checkAdmin,
    ...validations,
  ],
  controller.postProduct
);

router.get("/:id/detail", controller.getDetail);

router.get("/:id/edit", controller.getEdit);

//DELETE
router.delete("/:id/delete", controller.delete);

//PUT
router.put("/:id/edit", controller.updateProduct);

module.exports = router;
