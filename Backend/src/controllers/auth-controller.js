import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import { earlyReturnRespone, errorResponse, successResponse } from "../utilities/response-handler.js";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import generateUniqueCode from "../utilities/generate-unique-code.js";

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password || !role) {
            return earlyReturnRespone(res, "fields are required", 400)
        }
        const codeName = role === "ADMIN" ? "ADM" : "USER"
        const code = await generateUniqueCode('user', codeName);
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data:{name, code, email, password: hashPassword, role}
        })
        return successResponse(
            res,
            user,
            "User created successfully",
            201
        )

    } catch (error) {
        return errorResponse(res, error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return earlyReturnRespone(res, "fields are required", 400)
        }
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            return earlyReturnRespone(res, "Invalid Credentials", 400)
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return earlyReturnRespone(res, "Password is not matched", 400)
        }

        const token = await jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )

        const data = { id: user.id, name: user.name, email: user.email, role: user.role }

        res.cookie("token",token,{
            httpOnly: true,
            secure: false, // true in production    
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return successResponse(
            res,
            data,
            "User logged in successfully"
        )
    } catch (error) {
        return errorResponse(res, error);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        return successResponse(
            res,
            null,
            "User logged out successfully"
        );
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        return successResponse(res, users, "Users fetched successfully.", 200);
    }
    catch (error) {
        return errorResponse(res, error);
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if (!user) {
          return earlyReturnRespone(res, " User not found.", 404);
        }
        return successResponse(res, user, "User fetched successfully.", 200);
    }
    catch (error) {
        return errorResponse(res, error);
    }
}

const getMe = async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                code: true,
                email: true,
                role: true,
            }
        })
       return successResponse(res, user, "User fetched successfully.", 200);
    }
    catch (error) {
        return errorResponse(res, error);
    }
}

export {
    register,
    login,
    logout,
    getAllUsers,
    getUserById,
    getMe
}