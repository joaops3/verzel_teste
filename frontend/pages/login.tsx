import React from 'react'
import Header from '../components/header/Header'
import LoginForm from "../components/login/LoginForm"
import {NextPage} from "next"

const Login: NextPage = () => {
  return (
    <>
    <Header fixed={false}/>
    <LoginForm/>
    </>
  )
}

export default Login