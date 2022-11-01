import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { addMoneyRealMask } from "../../../helpers/helpers";
import { CarsInterface } from "../../../interfaces/interfaces";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import CarService from "../../../services/CarsService";
import CarsService from "../../../services/CarsService";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from 'react'

interface Props<T> extends CarsInterface {
  admin: boolean;
  setHandleAtt: Dispatch<SetStateAction<T>>
  photo: { url: string };
}

const Cards: React.FC<Props<any>> = ({ name, model, brand, price, photo, id, admin, setHandleAtt }) => {
  const handleDelete = (id: string) => {
    CarsService()
      .deleteCars(id)
      .then((resp) => {
        toast.success("Item deletado com sucesso");
         setHandleAtt( (prev: number) => prev+1)
      })
      .catch((e) => {
        toast.error("ERROR");
      });
  };
  return (
    <>
      <Card as={Col} md={3} className=" p-2 m-1" style={{ width: "18rem" }}>
        {admin && (
          <div className="d-flex justify-content-end gap-3 mt-1 mb-3">
            <Link href={`/product/${id}/edit`}>
              <button className="header-login m-0 px-3 py-2 ">
                <BsFillPencilFill size="20" />
              </button>
            </Link>

            <button
              className="header-cadastrar px-3 py-2"
              onClick={() => {
                handleDelete(id || "0");
              }}
            >
              <BsFillTrashFill size="20" />
            </button>
          </div>
        )}
        <Card.Img
          variant="top"
          src={`http://localhost:4000/${photo.url}`}
          style={{ maxHeight: "150px", minHeight: "150px" }}
        />
        <Card.Body>
          <Card.Title className="card-text">{name}</Card.Title>
          <Card.Text>
            <div className="card-text">Fabricante: {model}</div> <div>Ano: {brand}</div>
          </Card.Text>
          <Card.Text>{addMoneyRealMask(price)}</Card.Text>
          <Link href={`#`} className="btn-product">
            COMPRAR
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;
