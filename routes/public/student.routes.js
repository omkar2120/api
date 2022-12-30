const express = require("express");
const router = express.Router();
const studentController = require("../../controllers/public/studentController");

router.post("/student-add", studentController.addStudent);

module.exports = router;
