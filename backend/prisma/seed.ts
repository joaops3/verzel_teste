import {users} from "./data/users"
import { cars} from "./data/cars"
import db from "../src/database/db"

const main = async () => {
  users.forEach(async (user) => {
   await db.user.create({data: user})
  })
  cars.forEach(async (car)=> {
   await db.car.create({
     data: {
       name: car.name,
       brand: car.brand,
       model: car.model,
       price: Number(car.price),
       photo: { create: { url: car.photo! } },
     },
   });
  })
 
  }

main().catch((e)=> {console.log(e); process.exit(1)}).finally(()=> {db.$disconnect()})