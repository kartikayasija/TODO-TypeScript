import { Router } from "express";
import { login, signup, verifyToken } from "../controller/auth";
import verify from "../middleware/verifyToken";

const router = Router();

router
.post('/signup',signup)
.post('/login',login)
.post('/verifyToken', verify, verifyToken)


export default router;