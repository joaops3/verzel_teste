import db from "../database/db";
import {IUser} from "../interfaces/interfaces"
import bcrypt from "bcrypt";

class UserService {
  async findAll() {
    const user = await db.user.findMany();
    return user;
  }

  async findOne(id: string) {
    const user = await db.user.findFirst({ where: { id } });
    if (!user) {
      return;
    }
    return user;
  }

  async create(createUser: IUser) {
     const salt = await bcrypt.genSalt(1);
     const hash = await bcrypt.hash(createUser.password, salt);
     createUser.password = hash
      console.log("here",createUser)
    const user = await db.user.create({ data: createUser });
    return user;
  }

  async update(id: string, body: { name: string }) {
    const user = await db.user.update({ where: { id }, data: body });
    return user;
  }

  async delete(id: string) {
    const user = await db.user.delete({ where: { id }});
    return user;
  }
}


const userService = new UserService()
export default userService