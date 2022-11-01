import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table as BootstrapTable } from "react-bootstrap";
import Cards from "./Card/Cards";
import { CarsInterface } from "../../interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";
import {sortByPrice} from "../../helpers/helpers"


interface Props<T> {
  data: CarsInterface[] | undefined;
  setHandleAtt: Dispatch<SetStateAction<T>>;
  admin: boolean;
}


const Table: React.FC<Props<any>> = ({ data, admin, setHandleAtt }) => {

  useEffect(() => {}, [data]);

  return (
    <>
      <Container className="bg-login mt-5">
        <Row className="justify-content-between gap-3 py-3 px-3">
          {(data === undefined || data !== undefined) &&
            data
              ?.sort(sortByPrice)
              .reverse()
              .map((card: CarsInterface, index: number) => {
                return (
                  <Cards
                    key={index}
                    admin={admin}
                    id={card.id}
                    name={card.name}
                    model={card.model}
                    brand={card.brand}
                    price={card.price}
                    photo={card.photo}
                    setHandleAtt={setHandleAtt}
                  ></Cards>
                );
              })}
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Table;
