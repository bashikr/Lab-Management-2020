/**
 * Route for Lab.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const app = express();

app.use("/static", express.static(__dirname + "/static"));
app.set('view engine', 'ejs');

var category = require("../route/category");

router.use("/category", category);


var Users = require("../route/Users")
router.use("/users", Users)


var Items = require("../route/items")
router.use("/items", Items)


var Orders = require("../route/orders")
router.use("/orders", Orders)


var emails = require("../route/mailSender")
router.use("/emails", emails)


var sendAndInvoice = require("../route/sendAndInvoice")
router.use("/invoices", sendAndInvoice)

var returns = require("../route/returns")
router.use("/returns", returns)

module.exports = router;
