import express from "express";
import {test} from "../controller/userController.js";
import {signup} from "../controller/authController.js";

const router = express.Router();

router.post('/signup', signup);

export default router;
