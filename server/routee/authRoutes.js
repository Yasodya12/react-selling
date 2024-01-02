import express from "express";
import {test} from "../controller/userController.js";
import {signin, signup} from "../controller/authController.js";

const router = express.Router();

router.post('/signup', signup);
router.post("/signin", signin);

export default router;
