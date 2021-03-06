const Sequelize = require("sequelize");
const db = {}
const sequelize = new Sequelize("lab", "user", "pass", {
    "host": "localhost",
    "dialect": "mysql",
    "multipleStatements": true,
    operatorsAliases: false,

    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
