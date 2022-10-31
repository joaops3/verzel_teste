import React, {createContext, useState, useEffect} from 'react'
import {loginRequest, getToken, setToken} from "../helpers/auth"
import {api} from "../services/api"


interface Props{
    children: React.ReactNode
}

interface AuthContextInterface{
  isLogged: boolean
  user: any
  login: (email:string, password: string) => Promise<number> 
  logout: () => void
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)

const AuthProvider: React.FC<Props> = ({children}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [user, setUser] = useState(null)

  const login = async(email:string, password:string): Promise<number> => { 
    const data = await loginRequest(email, password)
    
    if(data){
      setToken(data.data)
      setIsLogged(true)
    }
    return data.id
  }

  const logout = () => {
    setToken(null)
    setIsLogged(false)
  }

  useEffect(()=> {
    const user = getToken()
    if(user){
      setUser(user)
      setIsLogged(true)
    }
  }, [isLogged])

  return (
   <AuthContext.Provider value={{isLogged, login, logout, user}}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider