/**
 * A module exporting functions to access the bank database.
 */
"use strict";

module.exports = {
    showOrders: showOrders,
    createOrder: createOrder,
    showSpecificOrder: showSpecificOrder,
    deleteAnOrder: deleteAnOrder,
    createAReserve: createAReserve,
    showReservationsByUserId: showReservationsByUserId
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
async function showOrders() {
    let sql = `CALL show_orders();`;
    let res;

    res = await db.query(sql);
    console.table(res)
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showSpecificOrder(userId) {
    let sql = `CALL show_orders_by_userId(?);`;
    let res;

    res = await db.query(sql, [userId]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showReservationsByUserId(userId) {
    let sql = `CALL show_reservations_by_user_id(?);`;
    let res;

    res = await db.query(sql, [userId]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function createOrder(itemsId, userId) {
    let sql = `CALL create_order(?, ?);`;
    let res;

    res = await db.query(sql, [itemsId, userId]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function createAReserve(itemsId, userId) {
    let sql = `CALL create_a_reserve(?, ?);`;
    let res;

    res = await db.query(sql, [itemsId, userId]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function deleteAnOrder(orderId) {
    let sql = `CALL delete_an_order(?);`;
    let res;

    res = await db.query(sql, [orderId]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res;
}
