/**
 * Route for Lab.
 */
"use strict";

const express = require("express");
const router  = express();
const cors = require("cors");
const sendAndInvoice    = require("../src/sendAndInvoice.js");

router.use(cors());
router.get("/sendAndInvoice/:userId", async (req, res) => {
    try {
        let id = req.params.userId;
        const pods = await sendAndInvoice.shipTheOrderedItems(id);
        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/showAnInvoice/:userId", async (req, res) => {
    try {
        let id = req.params.userId;
        const pods1 = await sendAndInvoice.showSpecificInvoice(id);
        res.status(201).send(pods1);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/showAllInvoices", async (req, res) => {
    try {
        const pods1 = await sendAndInvoice.showAllInvoices();
        res.status(201).send(pods1);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

module.exports = router;
