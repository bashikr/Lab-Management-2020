/**
 * Route for Café.
 */
"use strict";

const express = require("express");
const router  = express();
const cors = require("cors");
const orders = require("../src/orders.js");

router.use(cors());
router.get("/showOrders", async (req, res) => {
    try {
        const pods = await orders.showOrders();
        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/showOneOrder/:userId", async (req, res) => {
    try {
        let id = req.params.userId;
        const pods = await orders.showSpecificOrder(id);

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/showReservationsByUserId/:userId", async (req, res) => {
    try {
        let id = req.params.userId;
        const pods = await orders.showReservationsByUserId(id);

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});


router.get("/deleteAnOrder/:orderId", async (req, res) => {
    try {
        let id = req.params.orderId;
        const pods = await orders.deleteAnOrder(id);

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});



router.get("/orderCreate/:itemsId/:userId/", async (req, res) => {
    if(req.params.userId) {
        const pods = await orders.createOrder(req.params.itemsId, req.params.userId);

        res.status(201).send(pods);
    }
    else {
        res.send("I am Foo" + req.params.id);
    }
});

router.get("/createReserve/:itemsId/:userId/", async (req, res) => {
    if(req.params.userId) {
        const pods = await orders.createAReserve(req.params.itemsId, req.params.userId);

        res.status(201).send(pods);
    }
    else {
        res.send("I am Foo" + req.params.id);
    }
});

module.exports = router;
