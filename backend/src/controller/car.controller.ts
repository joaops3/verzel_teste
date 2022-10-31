import { Request, Response } from "express"
import carService from "../services/car.service"


class CarController {
  async findAll(req: Request, res: Response) {
    const car = await carService.findAll();
    res.status(200).json({ data: car });
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id required" });
    }
    const car = await carService.findOne(id);
    if (!car) {
      return res.status(404).json({ message: "car not found" });
    }
    res.status(200).json({ data: car });
  }

  async create(req: Request, res: Response) {
    const { name, model, brand, price } = req.body;
    const file = req.file as Express.Multer.File
    if (!name) {
      return res.status(400).json({ message: "name required" });
    }
    if (!model) {
      return res.status(400).json({ message: "model required" });
    }
    if (!brand) {
      return res.status(400).json({ message: "brand required" });
    }
    if (!price) {
     return  res.status(400).json({ message: "price required" });
    }
    if (!file) {
     return  res.status(400).json({ message: "photo required" });
    }
    const car = await carService.create({ name, model, brand, price, photo: file.filename });
    res.status(201).json({ data: {} });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file as Express.Multer.File
    if (!id) {
     return res.status(400).json({ message: "id required" });
    }
    const car = await carService.findOne(id)
    if (!car) {
      return res.status(404).json({ message: "car not found" });
      
    }
    if(file){
      await carService.update(id, { ...req.body, photo: file.filename });
    }else{
      await carService.update(id, { ...req.body});

    }
    res.status(200).json({ data: {} });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
     return res.status(400).json({ message: "id required" });
    }
    const car = await carService.findOne(id);
    if (!car) {
      return res.status(404).json({ message: "car not found" });
    }
    await carService.delete(id)
    res.status(200).json({ data: {} });
  }
}

const carController = new CarController()
export default carController

