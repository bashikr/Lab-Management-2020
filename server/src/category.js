/**
 * A module exporting functions to access the bank database.
 */
"use strict";

module.exports = {
    showCategory: showCategory,
    showItemFromCategory: showItemFromCategory,
    showShelf: showShelf
};


const mysql  = require("promise-mysql");
const config = require("../config/db/db.json");
let db;


/**
 * Main function.
 * @async
 * @returns void
 */
(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showCategory() {
    return findAllInTable("category");
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showShelf() {
    return findAllInTable("shelf");
}


/**
 * Show all entries in the selected table.
 *
 * @async
 * @param {string} table A valid table name.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function findAllInTable(table) {
    let sql = `SELECT * FROM ??;`;
    let res;

    res = await db.query(sql, [table]);

    return res;
}


/**
 * Show details for an account.
 *
 * @async
 * @param {string} id A id of the account.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showItemFromCategory(aId) {
    let sql = `CALL show_item_from_category(?);`;
    let res;

    res = await db.query(sql, [aId]);
    return res;
}


