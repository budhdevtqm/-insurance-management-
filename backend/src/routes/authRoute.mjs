import express from "express";
import { loginValidation } from "../../utils/validations.mjs";
import { login, addAdmin, logout } from "../controllers/authController.mjs";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.post("/register/admin", addAdmin);

export default router;
