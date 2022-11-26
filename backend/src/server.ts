import express, {Request, Response, ErrorRequestHandler} from "express"
import "express-async-errors"
import path from "path"
import userRoutes from "./route/userRoutes"
import carRoutes from "./route/carRoutes"
import cors from "cors"
import dotenv from "dotenv"
// import swaggerUi from "swagger-ui-express"
// import swaggerFile from "./swagger.json"
import { AppError } from "./errors/AppError"

dotenv.config()

const server = express()
server.use(express.static(path.join(__dirname, "../public")))
server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(cors())
//server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.use(userRoutes)
server.use(carRoutes)

server.use((req: Request, res: Response) => {
    res.status(404)
    res.json({message: "page not found"})
})


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({message: err.message})
  }
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(400);
  }
  if (err.message) {
    res.json({ message: err.message });
  } else {
    res.json({ message: "bad request" });
  }
};
server.use(errorHandler);

export default server