import express, {Request, Response, ErrorRequestHandler, response} from "express"
import "express-async-errors";
import path from "path"
import userRoutes from "./route/userRoutes"
import carRoutes from "./route/carRoutes"
import cors from "cors"
import dotenv from "dotenv"
import { AppError } from "./errors/AppError"


dotenv.config()

const server = express()
server.use(express.static(path.join(__dirname, "../public")))
server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(cors())


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
    res.status(500);
  }
  if (err.message) {
    res.json({ message: err.message });
  } else {
    res.json({ message: `Internal server error ${err}` });
  }
};
server.use(errorHandler);

server.listen(process.env.PORT || 4000, ()=> {console.log(`server listening on http://localhost:${process.env.PORT}`)})