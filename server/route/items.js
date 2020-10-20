/**
 * Route for Lab.
 */
"use strict";

const express = require('express');
const router  = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const items    = require("../src/items.js");

router.use(cors());
router.get("/showItems", async (req, res) => {
    try {
        const pods = await items.showItems();

        res.status(201).send(pods);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/showItems/:aId", async (req, res) => {
    try {
        let id = req.params.aId;
        const pods1 = await items.showItemSpecificationsById(id);

        res.status(201).send(pods1);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});


router.get("/deleteAnItem/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const pods1 = await items.deleteAnItem(id);

        res.status(201).send(pods1);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

router.get("/modifyAnItem", (req, res) => {
    res.render("items/modifyAnItem", data);
});

router.post("/modifyAnItem" ,urlencodedParser, async (req, res) => {
  try {
  const result = await items.modifyAnItem(
    req.body.a_id,
    req.body.a_amount,
    req.body.a_picturelink,
    req.body.a_description,
    req.body.a_productcode,
    req.body.a_category_id,
    req.body.a_shelf_place,
    req.body.a_shelf_amount

    );
    res.redirect("/items/showItems");
    return result
    res.status(201).send(pods);
    } catch (e) {
    res.status(400).send({ error: e });
    }
});


router.get("/item-create", (req, res) => {
    res.render("items/item-create", data);
});

router.post("/item-create", urlencodedParser, async (req, res) => {
    try {
        const result = await items.createItem(
        req.body.a_id,
        req.body.a_amount,
        req.body.a_picturelink,
        req.body.a_description,
        req.body.a_productcode,
        req.body.a_category_id,
        req.body.a_shelf_place,
        req.body.a_shelf_amount
    );
    res.redirect("/items/showItems");
    return result
    res.status(201).send(pods);
   } catch (e) {
     res.status(400).send({ error: e });
   }
});

router.get("/searchItems", async (req, res) => {
    if (req.query.search == null) {
        const pos = await items.showItems();
    } else {
        const pos = await items.searchItems(req.query.search);
    }
});

router.post('/searchItems', urlencodedParser, async (req, res) => {
    const result = await items.searchItems(req.body.search);

    console.table(result[0])
});

module.exports = router;
