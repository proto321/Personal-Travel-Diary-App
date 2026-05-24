import express from 'express';
import { getUsers, signout } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get("/getusers", verifyToken, getUsers)

router.post("/signout", signout) //for logout, we can just clear the cookie on the client side, but we can also have an endpoint to handle any server-side cleanup if needed.

export default router;