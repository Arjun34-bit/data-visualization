const express = require("express");
const { getAllRecords } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/getAllRecords", getAllRecords);

module.exports = router;
