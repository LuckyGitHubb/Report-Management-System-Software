import { Router } from "express";
import { register, login, logout, getUserById, getAllUsers, getMe } from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/user/:id", getUserById);

authRouter.get("/users", getAllUsers);

authRouter.get("/me", authMiddleware, getMe);


export default authRouter; 