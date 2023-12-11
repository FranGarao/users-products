const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const fs = require("fs");
const methodOverride = require("method-override");
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const app = express();

//middleware de aplicacion
app.use((req, res, next) => {
  const route = req.path + "\n";
  if (route === "/favicon.ico") {
    return;
  }
  fs.appendFileSync(path.join(__dirname, "./dataBase/routeInfo.txt"), route);
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//le decimos desde donde va a agarrar el metodo (productDetail.ejs)
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/products", productsRouter);
app.use((req, res) => {
  res.send("Error 404 - Not Found");
});

app.listen(port, () => {
  console.log("El puerto " + port + " esta funcionando correctamente");
});
module.exports = app;
