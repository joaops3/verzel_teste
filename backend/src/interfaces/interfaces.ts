export interface IUser {
  id?: string;
  name: string;
  password: string;
  admin?: boolean 
  createdAt?: Date;
}

export interface ICar {
  id?: string;
  name: string;
  model: string;
  brand: string
  price: number
  photo?: string
}

