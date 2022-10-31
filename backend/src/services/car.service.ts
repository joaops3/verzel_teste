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
    createCar.name = createCar.name.toLowerCase().trim()
    createCar.brand = createCar.brand.toLowerCase().trim()
    const car = await db.car.create({ data: { name: createCar.name, brand: createCar.brand, model: createCar.model, price: Number(createCar.price), photo: { create: { url: createCar.photo! } } } });
    return car;
  }

  async update(id: string, newValues: ICar) {
    const photoToRemove = await db.photo.findFirst({where: {carId: id}})
    if(photoToRemove &&newValues.photo){
      await unlink(`./public/${photoToRemove.url}`)
    }
   newValues.name =newValues.name.toLowerCase().trim()
   newValues.brand =newValues.brand.toLowerCase().trim()
    const updatedCar = await db.car.update({ where: { id }, data: { name:newValues.name, brand:newValues.brand, model:newValues.model, price: Number(newValues.price), photo: { update: { url:newValues.photo } } } });
    if(!updatedCar){
      return
    }
    return updatedCar;
  }

  async delete(id: string) {
    const photoToRemove = await db.photo.findFirst({where: {carId: id}})
    if(photoToRemove){
      await unlink(`./public/${photoToRemove.url}`)
    }
    await db.photo.delete({ where: { carId: id } })
    const car = await db.car.delete({ where: { id } });
    return car;
  }


}


const carService = new CarService()
export default carService