const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const model = {
  fileRoute: path.join(__dirname, "../dataBase/users.json"),
  findAll: () => {
    const dataJson = JSON.parse(fs.readFileSync(model.fileRoute));
    return dataJson;
  },
  create: (dataBase) => {
    let users = model.findAll();
    let newUser = {
      id: uuid.v4(),
      ...dataBase,
    };
    const hashedPw = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hashedPw;
    users.push(newUser);
    fs.writeFileSync(model.fileRoute, JSON.stringify(users), "utf-8");
  },
  findByEmail: (email) => {
    const users = model.findAll();
    const coincidence = users.find((user) => user.email === email);
    return coincidence || null;
  },
};
module.exports = model;
