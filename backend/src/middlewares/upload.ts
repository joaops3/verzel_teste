import multer, { diskStorage } from "multer"
import path from "path"
const dotenv = require("dotenv")


dotenv.config()


const storageTypes = {
    local: diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/")
        },
        filename: (req, file, cb) => {
            let random = `${Date.now() + Math.floor(Math.random() * 999999)}`
            cb(null, file.fieldname + random + path.extname(file.originalname))
        },
    }),
}


export const upload = multer({
    storage: storageTypes.local, fileFilter: (req, file, cb) => {
        let requirements = /[\/.](gif|jpg|jpeg|png|svg|webp)$/i;
        if (!file.mimetype.match(requirements)) {
            return cb(new Error("error invalid mime type"))
        }
        cb(null, true)

    }, limits: { fileSize: 50000000 }
})