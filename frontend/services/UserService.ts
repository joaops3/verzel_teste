import axios from 'axios'
import React from 'react'
import { api } from "./api"
import { UsersInterface } from '../interfaces/interfaces'


const UserService = () => {

   const setUser = async (data: UsersInterface) => {

      const request = await api.post("/user", data)
      return request


   }

   const getUser = async (id: string) => {

      const request = await api.get(`/user/${id}`)
      return request

   }
   const updateUser = async (id: string, data: UsersInterface) => {

      const request = await api.put(`/user/${id}`, data)
      return request

   }
   const deleteUser = async (id: string) => {

      const request = await api.delete(`/user/${id}`)
      return request


   }


   const getCep = async (cep: string) => {

      const request = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      return request

   }



   return { setUser, getUser, updateUser, deleteUser, getCep }
}

export default UserService