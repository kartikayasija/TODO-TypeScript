import { Router } from "express";
import { getAllUsers, getUser } from "../controller/user";

const router: Router = Router();

router
.get('/getAll', getAllUsers)
.get('/getUser/:id',getUser)

export default router;