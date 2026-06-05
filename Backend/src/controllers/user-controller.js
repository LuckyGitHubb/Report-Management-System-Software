import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { earlyReturnRespone, successResponse } from "../utilities/response-handler";
import bcrypt from 'bcryptjs'

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password || !role) {
            return earlyReturnRespone(res, "fields are required", 400)
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await prisma.User.create({
            name, email, password: hashPassword, role
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
        const user = await prisma.User.findUnique({
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
            secure: false, // ture in production    
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