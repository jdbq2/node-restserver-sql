"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
const db = new sequelize_1.Sequelize("jdbq1612", "root", process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});
exports.default = db;
//# sourceMappingURL=connection.js.map