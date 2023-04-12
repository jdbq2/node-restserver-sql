import { Sequelize } from "sequelize";
require("dotenv").config();

const db = new Sequelize("jdbq1612", "root", process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});

export default db;
