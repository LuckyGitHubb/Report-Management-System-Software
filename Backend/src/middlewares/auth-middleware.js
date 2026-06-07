import jwt from "jsonwebtoken";
import { earlyReturnRespone, errorResponse } from "../utilities/response-handler.js";

export const authMiddleware = async(req,res)=>{
    try {
    const token = req.cookie.token;
    if (!token) {
      return earlyReturnRespone(
        res,
        "Unauthorized",
        401
      );
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    req.user = decoded
    next()
    } catch (error) {
      return errorResponse(res, error);  
    }
}