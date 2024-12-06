const express = require("express");
const {
  createForm,
  getAllForms,
  getQuiz,
} = require("../controllers/dashboardController");

const router = express.Router();

router.post("/createForm", createForm);
router.get("/getAllForms", getAllForms);
router.get("/getQuiz/:val", getQuiz);

module.exports = router;
