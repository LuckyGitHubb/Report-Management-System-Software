import { Router } from "express";
import { register, login, logout, getUserById, getAllUsers } from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/user/:id", getUserById);

authRouter.get("/users", getAllUsers);


export default authRouter; 