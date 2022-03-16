const { Pool } = require("pg");

let config = {
  dataBase: "personal-web",
  port: "5432",
  user: "postgres",
  password: "123",
};
const dbPool = new Pool(config);

module.exports = dbPool;
