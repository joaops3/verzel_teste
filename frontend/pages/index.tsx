import React, { useCallback } from "react";
import Header from "../components/header/Header";
import MainBanner from "../components/banner/MainBanner";
import Footer from "../components/footer/Footer";
import dynamic from "next/dynamic"
import { Row, Container, Col } from "react-bootstrap";
import Loading from "../components/UI/loading/Loading";
import { useState, useEffect, useContext } from "react";
import { CarsInterface} from "../interfaces/interfaces";
import {NextPage} from "next"
import CarsService from "../services/CarsService";
import { AuthContext } from "../context/AuthProvider";
const Table = dynamic(()=> import("../components/table/Table"), {ssr: false})



const Home: NextPage = () => {
  const {user} = useContext(AuthContext)
  const [data, setData] = useState<CarsInterface[]>([{} as CarsInterface]);
  const [loading, setLoading] = useState<boolean>(true);

  

  const getCars = useCallback(async () => {
    CarsService().getAllCars().then((resp)=> {setData(resp.data.data); setLoading(false)}).catch((e) => {console.log(e)})
  
  }, []);

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <>
      <Header fixed={true}></Header>
      <MainBanner></MainBanner>
      <Container>
      {loading ?  <Loading></Loading>: <Table data={data} admin={user?.admin || false }></Table>}
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;

