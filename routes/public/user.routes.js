import express from "express";
import userController from "../../controllers/public/userController.js";

const router = express.Router();

router.post("/user-signup", userController.signup);
router.post("/user-login", userController.login);
router.post("/user-add-address", userController.addressAdd);
router.post("/user-get-all", userController.getAllUsers);
router.post("/user-get-single", userController.getSigleUser);
router.post("/user-remove", userController.removeSingleUser);
router.post("/user-details", userController.getUserDetails);

export default router;
