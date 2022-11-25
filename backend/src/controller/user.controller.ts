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
      return res.status(400).json({message: "id required" });
    }
    const user = await userService.findOne(id);
    if (!user) {
     return res.status(404).json({message: "user not found" });
    }
    res.status(200).json({ data: user });
  }

  async create(req: Request, res: Response) {
    const { name, password, admin } = req.body;
    if (!name) {
      return res.status(400).json({message: "name required" });
    }
    if (!password) {
      return res.status(400).json({message: "password required" });
    }
    const user = await userService.create({ name, password, admin })
    if(!user){
      return res.status(400).json({ message: "user already exists" });
    }
    res.status(201).json({ data: {token: user.token, admin: user.admin} });
  }

  async login(req: Request, res: Response){
    const {name, password} = req.body
    if (!name) {
      return res.status(400).json({message: "name required" });
    }
    if (!password) {
      return res.status(400).json({message: "password required" });
    }
    const user = await userService.login(name, password);
    if(!user){
      return res.status(401).json({message: "invalid credentials" });
    }
    res.status(200).json({data: user });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({message: "id required" });
    }
    const { name } = req.body;
    const user = await userService.update(id, { name });
     res.status(200).json({ data: {} });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({message: "id required" });
    }
    const user = await userService.findOne(id);
    if (!user) {
      return res.status(404).json({message: "user not found" });
    }
    await userService.delete(id)
    res.status(200).json({ data: {} });
  }
}

const userController = new UserController()
export default userController

