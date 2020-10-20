/**
 * A module exporting functions to access the lab database.
 */
"use strict";

module.exports = {
    showItems: showItems,
    searchItems: searchItems,
    createItem: createItem,
    showItemSpecificationsById: showItemSpecificationsById,
    deleteAnItem: deleteAnItem,
    modifyAnItem: modifyAnItem,
    searchItems: searchItems
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
async function showItems() {
    let sql = `CALL show_all_items_information();`;
    let res;

    res = await db.query(sql);
    console.table(res);
    return res;
}


/**
 * Create a new account.
 *
 * @async
 * @param {string} id      A id of the account.
 * @param {string} name    The name of the account holder.
 * @param {string} balance Initial amount in the account.
 *
 * @returns {void}
 */
async function createItem(a_id, a_amount, a_picturelink, a_description, a_productcode, a_category_id, a_shelf_place, a_shelf_amount) {
    let sql = `CALL add_to_lab(?, ?, ?, ?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [a_id, a_amount, a_picturelink, a_description, a_productcode, a_category_id, a_shelf_place, a_shelf_amount]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


/**
 * Show details for an account.
 *
 * @async
 * @param {string} id A id of the account.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function modifyAnItem(a_id, a_amount, a_picturelink, a_description, a_productcode, a_category_id, a_shelf_place, a_shelf_amount) {
    let sql = `CALL modify_an_item(?, ?, ?, ?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [a_id, a_amount, a_picturelink, a_description, a_productcode, a_category_id, a_shelf_place, a_shelf_amount]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


/**
 * Show details for an account.
 *
 * @async
 * @param {string} id A id of the account.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showItemSpecificationsById(aId) {
    let sql = `CALL show_item_from_items(?);`;
    let res;

    res = await db.query(sql, [aId]);
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
async function deleteAnItem(id) {
    let sql = `CALL delete_an_item(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.table(res)
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function searchItems(search) {
    let sql = `CALL search_items(?);`;
    let res;
    let like = `%${search}%`;

    res = await db.query(sql, [like]);
    console.table(res[0])
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}
