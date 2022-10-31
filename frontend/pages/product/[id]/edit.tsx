import React, {useEffect, useState, useContext, useCallback} from 'react'
import FormProduct from "../../../components/form/FormProduct"
import Header from '../../../components/header/Header'
import {Container, Row} from "react-bootstrap"
import {UsersInterface} from "../../../interfaces/interfaces"
import {AuthContext} from "../../../context/AuthProvider"
import {NextPage} from "next"
import CarsService from "../../../services/CarsService"

const SignIn: NextPage = () => {

  return (
    <>
    <Header fixed={false}></Header>
    <Container fluid>
    <Row className="text-center"><h1>Editar Veículo</h1></Row>
    <FormProduct operation={"edit"} ></FormProduct>
    </Container>
    </>
  )
}

export default SignIn