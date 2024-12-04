const express = require("express");
const {
  getAllRecords,
  getAllAverageRecords,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/getAllRecords", getAllRecords);
router.get("/getAllAverageRecords", getAllAverageRecords);

module.exports = router;
