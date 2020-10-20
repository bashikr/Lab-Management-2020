/**
 * Route for Lab.
 */
"use strict";

const express = require("express");
const router  = express();
const cors = require("cors");
const returns    = require("../src/returns.js");

router.use(cors());
router.get("/showReturnRequests", async (req, res) => {
    try {
        const pods = await returns.showAllReturnRequests();

        res.status(201).send(pods);
    } catch (e) {
         res.status(400).send({ error: e });
    }
});

router.get("/showReturnRequestsById/:id", async (req, res) => {
    let id = req.params.id;

    try {
        const pods = await returns.showAllReturnRequestsById(id);

        res.status(201).send(pods);
    } catch (e) {
         res.status(400).send({ error: e });
    }
});

router.get("/acceptedReturns", async (req, res) => {
    try {
        const pods = await returns.showAllAcceptedReturnRequests();

        res.status(201).send(pods);
    } catch (e) {
         res.status(400).send({ error: e });
    }
});

router.get("/returnSpecificInvoice/:invoicenumber", async (req, res) => {
    try {
        let invoicenumber = req.params.invoicenumber;
        const pods = await returns.returnSpecificInvoice(invoicenumber);

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/checkItemStatus/:id/:status", async (req, res) => {
    try {
        let id = req.params.id;
        let status = req.params.status;
        const pods = await returns.checkItemStatus(id, status);

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

module.exports = router;
