/**
 * A module exporting functions to access the bank database.
 */
"use strict";

module.exports = {
    shipTheOrderedItems: shipTheOrderedItems,
    showSpecificInvoice: showSpecificInvoice,
    showAllInvoices: showAllInvoices
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
 * Show details for an account.
 *
 * @async
 * @param {string} id A id of the account.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function shipTheOrderedItems(a_user_id) {
    let sql = `CALL ship_the_ordered_items(?);`;
    let res;

    res = await db.query(sql, [a_user_id]);
    console.table(res)
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
async function showSpecificInvoice(a_user_id) {
    let sql = `CALL show_specific_invoice(?);`;
    let res;

    res = await db.query(sql, [a_user_id]);
    console.table(res)
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
async function showAllInvoices() {
    let sql = `CALL show_all_invoices();`;
    let res;
    res = await db.query(sql);

    console.table(res)
    return res;
}
