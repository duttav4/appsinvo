import express from "express";
import { createUser, getAllUser, getDistance, weeklyUser } from "../controller/UserController.js";
import { ProtectedRoute } from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.post( "/create-user", createUser );

router.get( "/get-all-user", getAllUser );

router.get( "/get-distance/:id", getDistance );

router.get( "/user-list-weekly", weeklyUser );

export default router;