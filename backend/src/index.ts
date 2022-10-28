import express, {Request, Response, ErrorRequestHandler} from "express"
import path from "path"
import userRoutes from "./route/userRoutes"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()

const server = express()
server.use(express.static(path.join(__dirname, "../public")))
server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(cors())


server.use(userRoutes)

server.use((req: Request, res: Response) => {
    res.status(404)
    res.json({error: "page not found"})
})


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(400);
  }
  if (err.message) {
    res.json({ error: err.message });
  } else {
    res.json({ error: "bad request" });
  }
};
server.use(errorHandler);

server.listen(process.env.PORT || 3000);