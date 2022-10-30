import React, { useCallback } from "react";
import Header from "../components/header/Header";
import MainBanner from "../components/banner/MainBanner";
import Footer from "../components/footer/Footer";
import dynamic from "next/dynamic"
import { Row, Container, Col } from "react-bootstrap";
import Loading from "../components/UI/loading/Loading";
import { useState, useEffect } from "react";
import { CarsInterface} from "../interfaces/interfaces";
import {NextPage} from "next"
const Table = dynamic(()=> import("../components/table/Table"), {ssr: false})



const Home: NextPage = () => {
  const [data, setData] = useState<CarsInterface[]>([{name: "teste", model: "teste", brand: "gm", price: 100000, photo: "/images/main.jpg"} as CarsInterface]);
  const user = true
  const [loading, setLoading] = useState<boolean>(true);

  

  const getCars = useCallback(async () => {
  
  }, []);

  useEffect(() => {
    getCars();
  }, [getCars,]);

  return (
    <>
      <Header fixed={true}></Header>
      <MainBanner></MainBanner>
      <Container>
      {loading ?  <Loading></Loading>: <Table data={data} admin={user}></Table>}
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;

