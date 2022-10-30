import axios from "axios"
import {getToken} from "../helpers/auth"

//axios.post(url, body, method, header)

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

const header = {
    "Content-Type": "application/json",
    Authorization: "",
}
const parameters = {
    method: "GET",
    headers: header

}

api.interceptors.request.use((config: any) => {
    const user = getToken()
    if (!user) {
        return config
    }
    if (config.headers) {
        config.headers.Authorization = `Bearer ${user.token}`
        return config
    }
}, (error) => {
    return Promise.reject(error)

})