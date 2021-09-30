import {Router} from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

// Login
router.post("/login", AuthController.login);

// Registration
router.post("/registration", AuthController.registration);

export default router;