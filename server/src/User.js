const Sequelize = require("sequelize");
const db = require("../config/db/db.js");

module.exports = db.sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        address: {
            type: Sequelize.STRING,
        },
        postnumber: {
            type: Sequelize.INTEGER,
        },
        city: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.STRING,
        },
        phonenumber: {
            type: Sequelize.STRING,
        },
        birthday: {
            type: Sequelize.DATE,
        },
        role: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false
    }
)
