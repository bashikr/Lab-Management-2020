/**
 * A module exporting functions to access the bank database.
 */
"use strict";

module.exports = {
    showAllReturnRequests: showAllReturnRequests,
    returnSpecificInvoice: returnSpecificInvoice,
    checkItemStatus: checkItemStatus,
    showAllAcceptedReturnRequests: showAllAcceptedReturnRequests,
    showAllReturnRequestsById: showAllReturnRequestsById
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
 * Show all entries in the selected table.
 *
 * @async
 * @param {string} table A valid table name.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showAllReturnRequests() {
    let sql = `CALL show_all_returns_with_details();`;
    let res;

    res = await db.query(sql);
    console.table(res);
    return res;
}


/**
 * Show all entries in the selected table.
 *
 * @async
 * @param {string} table A valid table name.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showAllReturnRequestsById(id) {
    let sql = `CALL show_all_returns_with_details_by_id(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.table(res);
    return res;
}


/**
 * Show all entries in the selected table.
 *
 * @async
 * @param {string} table A valid table name.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showAllAcceptedReturnRequests() {
    let sql = `CALL show_all_accepted_returns_with_details();`;
    let res;

    res = await db.query(sql);
    console.table(res);
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function returnSpecificInvoice(invoicenumber) {
    let sql = `CALL invoice_to_return_table(?);`;
    let res;

    res = await db.query(sql, [invoicenumber]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}

/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function checkItemStatus(id, status) {
    let sql = `CALL accept_returned_item(?, ?);`;
    let res;

    res = await db.query(sql, [id, status]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}
