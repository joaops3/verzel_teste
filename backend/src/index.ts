import server from "./server"
import dotenv from "dotenv"

dotenv.config()

server.listen(process.env.PORT || 4000, ()=> {console.log(`server listening on http://localhost:${process.env.PORT}`)})