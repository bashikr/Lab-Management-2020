/**
 * Route for Lab.
 */
"use strict";

const express = require("express");
const router  = express();
const cors = require("cors");
const category    = require("../src/category.js");

router.use(cors());
router.get("/showCategory", async (req, res) => {
    try {
        const pods = await category.showCategory();

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/showShelf", async (req, res) => {
    try {
        const pods = await category.showShelf();

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/category-show/:aId", async (req, res) => {
    try {
        let id = req.params.aId;
        const pods1 = await category.showItemFromCategory(id);

        res.status(201).send(pods1);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

module.exports = router;
