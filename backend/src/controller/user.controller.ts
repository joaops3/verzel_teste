import {Request, Response} from "express"
import userService from "../services/user.service"


class UserController {
  async findAll(req: Request, res: Response) {
    const user = await userService.findAll();
    res.status(200).json({ data: user });
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({message: "id required" });
    }
    const user = await userService.findOne(id);
    if (!user) {
      res.status(404).json({message: "user not found" });
    }
    res.status(200).json({ data: user });
  }

  async create(req: Request, res: Response) {
    const { name, password } = req.body;
    if (!name) {
      res.status(422).json({message: "name required" });
    }
    if (!password) {
      res.status(422).json({message: "name required" });
    }
    const user = await userService.create({ name, password });
    res.status(201).json({ data: user });
  }

  async update(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({message: "id required" });
    }
    const { name } = req.body;
    const user = await userService.update(id, { name });
     res.status(200).json({ data: {} });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({message: "id required" });
    }
    const user = await userService.findOne(id);
    if (!user) {
      res.status(404).json({message: "user not found" });
    }
    await userService.delete(id)
    res.status(200).json({ data: {} });
  }
}

const userController = new UserController()
export default userController

