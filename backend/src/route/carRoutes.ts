import { Router } from "express";
import carController from "../controller/car.controller";
import { adminOnly, privateRoute } from "../middlewares/private";
import { upload } from "../middlewares/upload";

const route = Router()
route.get("/car", carController.findAll)
route.post("/car", adminOnly, upload.single("photo"), carController.create)
route.get("/car/:id", carController.findOne);
route.put("/car/:id", adminOnly, upload.single("photo"), carController.update);
route.delete("/car/:id",adminOnly, carController.delete);


export default route