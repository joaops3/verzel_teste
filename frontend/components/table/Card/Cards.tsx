import React from 'react'
import {Card, Button, Row} from "react-bootstrap"
import Link from 'next/link'
import { addMoneyRealMask } from '../../../helpers/helpers'
import { CarsInterface } from '../../../interfaces/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs"
interface Props extends CarsInterface {
 admin: boolean
}

const Cards: React.FC<Props> = ({name, model, brand ,price, photo, id, admin}) => {

  return (
    <>
   
    <Card className=" p-2 m-1" style={{ width: '18rem' }}>
    {admin && ( 
       <div className="d-flex justify-content-end gap-3 mt-1 mb-3">
        <Link href={``}>
        <button className='header-login m-0 px-3 py-2 '><BsFillPencilFill size="20"/></button>
        </Link>
        <Link href={``}>
        <button className='header-cadastrar px-3 py-2'><BsFillTrashFill size="20"/></button>
        </Link>
        </div>) }
      <Card.Img variant="top" src={`${photo}`} style={{maxHeight: "150px", minHeight: "150px"}} />
      <Card.Body>
        <Card.Title className="card-text">{name}</Card.Title>
        <Card.Text>
          <div className='card-text'>Fabricante: {model}</div>  <div>Ano: {brand}</div>
        </Card.Text>
        <Card.Text>
         {addMoneyRealMask(price) }
        </Card.Text>
        <Link href={`#`} className="btn-product">COMPRAR</Link>
       
      </Card.Body>
    </Card>
    </>
  )
}

export default Cards