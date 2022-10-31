export interface CarsInterface {
    id?: string,
    name: string,
    model: string,
    brand: string,
    price: number,
    photo: photo
}


export interface UsersInterface {
    name: string,
    admin?: boolean,
    password?: string
}

export interface photo {
    id?: number
    url: string
    carId?: string 
}