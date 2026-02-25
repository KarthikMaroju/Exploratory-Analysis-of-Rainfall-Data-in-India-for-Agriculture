const mongoose = require("mongoose");

const rainfallSchema = new mongoose.Schema({
    state: String,
    year: Number,
    rainfall: Number
});

module.exports = mongoose.model("Rainfall", rainfallSchema);
