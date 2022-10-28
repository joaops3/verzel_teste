import { Router } from "express";
import userController from "../controller/user.controller";


const route = Router()
route.get("/user", userController.findAll)
route.post("/user", userController.create)
route.get("/user/:id", userController.findOne);
route.put("/user/:id", userController.update);
route.delete("/user/:id", userController.delete);


export default route