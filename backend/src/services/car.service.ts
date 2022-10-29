import { unlink } from "fs/promises";
import db from "../database/db";
import { ICar } from "../interfaces/interfaces"


class CarService {
  async findAll() {
    const car = await db.car.findMany({ include: { photo: true } });
    return car;
  }

  async findOne(id: string) {
    const car = await db.car.findFirst({ where: { id }, include: { photo: true } });
    if (!car) {
      return;
    }
    return car;
  }

  async create(createCar: ICar) {
    const car = await db.car.create({ data: { name: createCar.name.trim(), brand: createCar.brand, model: createCar.model, price: Number(createCar.price), photo: { create: { url: createCar.photo! } } } });
    return car;
  }

  async update(id: string, body: ICar) {
    const photoToRemove = await db.photo.findFirst({where: {carId: id}})
    if(photoToRemove){
      await unlink(`./public/${photoToRemove.url}`)
    }
    const updatedCar = await db.car.update({ where: { id }, data: { name: body.name, brand: body.brand, model: body.model, price: Number(body.price), photo: { update: { url: body.photo } } } });
    if(!updatedCar){
      return
    }
    return updatedCar;
  }

  async delete(id: string) {
    await db.photo.delete({ where: { carId: id } })
    const car = await db.car.delete({ where: { id } });
    return car;
  }


}


const carService = new CarService()
export default carService