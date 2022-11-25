import db from "../database/db";
import { IUser } from "../interfaces/interfaces"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/helpers"
import { AppError } from "../errors/AppError";

class UserService {
  async findAll() {
    const user = await db.user.findMany({ select: { id: true, name: true, admin: true } });
    return user;
  }

  async findOne(id: string) {
    const user = await db.user.findFirst({ where: { id }, select: { id: true, name: true, admin: true } });
    if (!user) {
      return;
    }
    return user;
  }

  async create(createUser: IUser) {
    const checkUser = await db.user.findFirst({where: {name: createUser.name}})
    if(checkUser){
      return 
    }
    const salt = await bcrypt.genSalt(1);
    const hash = await bcrypt.hash(createUser.password, salt);
    createUser.password = hash
    createUser.admin = Boolean(createUser.admin)
    createUser.name = createUser.name.toLowerCase()
    const user = await db.user.create({ data: createUser });
    const token = await generateToken({ id: user.id, email: user.name, admin: user.admin })
    return { token, admin: user.admin };
  }

  async login(name: string, password: string){
    const user = await db.user.findFirst({where: {name}})
    if(!user){
      return 
    }
    const checkpassword = await bcrypt.compare(password, user.password)
    if (!checkpassword) {
        return 
    }
    const token = await generateToken({ id: user.id, email: user.name, admin: user.admin })
    return {id: user.id, admin: user.admin, token}
  }

  async update(id: string, body: { name: string }) {
    const user = await db.user.update({ where: { id }, data: body });
    return user;
  }

  async delete(id: string) {
    const user = await db.user.delete({ where: { id } });
    return user;
  }
}


const userService = new UserService()
export default userService