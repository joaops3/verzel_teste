import { Request, Response, NextFunction } from "express"
import passport, { notAuthorizedJson } from "../config/passport"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

interface IJwtPayload extends JwtPayload {
    admin: boolean
}

export const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate("jwt", (err, user) => {
        req.user = user

        if (user) {
            next()
        } else {
            next(notAuthorizedJson)
        }
    })
    authFunction(req, res, next)
}

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate("jwt", (err, user) => {
        req.user = user
        const token = req.headers.authorization?.substring(7)
        if (token) {
            const decoded = jwt.decode(token) as IJwtPayload
            if(!decoded.admin){
                next(notAuthorizedJson)
            } 
            next()
        } else {
            next(notAuthorizedJson)
        }
    })
    authFunction(req, res, next)
}
