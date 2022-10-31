import { api } from "./api"
import { CarsInterface } from "../interfaces/interfaces"
import React from 'react'


const CarsService = () => {

  const getCars = async (page?: number, limit?: number) => {

    const request = await api.get(`/car?page=${page}&limit=${limit}`)
    return request

  }

  const getAllCars = async () => {
    const request = await api.get(`/car`)
    return request
 
}

const getCarsId = async (id: string) => {
 
    const request = await api.get(`/car/${id}`)
    return request
 
  }

const setCars = async (data: any) => {
  
    const request = await api.post(`/car`, data)
    return request
 
}
const updateCars = async (id: string, data: CarsInterface) => {
 
    const request = await api.put(`/car/${id}`, data)
    return request
  
 
}
const deleteCars = async (id: string) => {
  
    const request = await api.delete(`/car/${id}`)
    return request

}

return { getCars, getAllCars, getCarsId, setCars, updateCars, deleteCars }

}

export default CarsService