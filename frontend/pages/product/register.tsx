import React, { useEffect, useState } from "react";
import FormProduct from "../../components/form/FormProduct";
import Header from "../../components/header/Header";
import { Container, Row } from "react-bootstrap";
import { GetServerSideProps, NextPage } from "next";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../components/UI/loading/Loading";
import { getProtected } from "../../services/auth";

export const getServerSideProps = (ctx: GetServerSideProps) => {
  return getProtected(ctx, (index: any) => {
    return { props: { } };
  }, "admin");
};

const SignIn: NextPage = () => {

  return (
    <>
      <Header fixed={false}></Header>
      <Container fluid>
        <Row className="text-center">
          <h1>Cadastrar Veículo</h1>
        </Row>
        <FormProduct operation={"sign"}></FormProduct>
      </Container>
    </>
  );
};

export default SignIn;
