export interface CarsInterface {
    id?: number,
    name: string,
    model: string,
    brand: string,
    price: number,
    photo: string
}


export interface UsersInterface {
    name: string,
    admin?: boolean,
    password?: string
}