import express from "express";
import studentController from "../../controllers/public/studentController.js";

const router = express.Router();

router.post("/student-add", studentController.addStudent);
router.get("/student-get", studentController.getStudents);
router.post("/student-update", studentController.updateStudent);
router.post("/student-delete", studentController.deleteStudent);

export default router;
