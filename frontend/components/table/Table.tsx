import React, { useEffect } from 'react'
import {Col, Container, Row} from "react-bootstrap"
import Cards from './Card/Cards'
import { CarsInterface} from "../../interfaces/interfaces"
interface Props {
  data:CarsInterface[] | undefined,
  admin: boolean
}

const Table: React.FC<Props> = ({data, admin}) => {
  useEffect(()=> {}, [data])
  
  return (
    <>   
    <Container className='bg-login mt-5'>
   
        <Row className="p-3 d-flex justify-content-between">
        {(data === undefined || data !== undefined) && (data?.map((card: any, index:number)=> {return <Cards key={index} admin={admin} id={card.id} name={card.name_car} model={card.model} brand={card.brand} price={card.price} photo={card.photo}></Cards>})) }
        </Row>
        <Row>
        </Row>
    </Container>
    </>
  )
}

export default Table