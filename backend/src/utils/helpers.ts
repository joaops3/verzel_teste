import jwt from "jsonwebtoken"

export const generateToken = async (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "24h" })
}