/**
 * A module exporting functions to access the bank database.
 */
"use strict";

module.exports = {
    changeUserPrivileges: changeUserPrivileges,
    showUsers: showUsers,
    showCurrentUser: showCurrentUser,
    deleteUser: deleteUser
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
async function changeUserPrivileges(email, role) {
    let sql = `CALL change_user_role(?, ?);`;
    let res;

    res = await db.query(sql, [email, role]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
    return res[0];
}


/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showUsers() {
    return findAllInTable("users");
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
    console.table(res);
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
async function showCurrentUser(email) {
    let sql = `CALL show_current_user(?);`;
    let res;

    res = await db.query(sql, [email]);
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
async function deleteUser(userId) {
    let sql = `CALL delete_user(?);`;
    let res;

    res = await db.query(sql, [userId]);
    console.table(res);
    return res;
}
