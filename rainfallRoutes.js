const express = require("express");
const router = express.Router();
const Rainfall = require("../models/Rainfall");

router.post("/", async (req, res) => {
    const rainfall = new Rainfall(req.body);
    await rainfall.save();
    res.json(rainfall);
});

router.get("/", async (req, res) => {
    const data = await Rainfall.find();
    res.json(data);
});

module.exports = router;
