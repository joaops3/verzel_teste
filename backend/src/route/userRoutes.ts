import { Router } from "express";
import userController from "../controller/user.controller";
import { adminOnly, privateRoute } from "../middlewares/private";


const route = Router()
route.get("/user", userController.findAll)
route.post("/user", userController.create)
route.post("/login", userController.login)
route.get("/user/:id", privateRoute, userController.findOne);
route.put("/user/:id", privateRoute, userController.update);
route.delete("/user/:id", privateRoute, userController.delete);


export default route