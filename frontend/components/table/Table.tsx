import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "./Card/Cards";
import { CarsInterface } from "../../interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";
interface Props<T> {
  data: CarsInterface[] | undefined;
  setHandleAtt: Dispatch<SetStateAction<T>>;
  admin: boolean;
}

export function sortByPrice(a: any, b: any) {
  

  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
}

const Table: React.FC<Props<any>> = ({ data, admin, setHandleAtt }) => {
  useEffect(() => {}, [data]);

  return (
    <>
      <Container className="bg-login mt-5">
        <Row className="p-3 d-flex justify-content-between">
          {(data === undefined || data !== undefined) &&
            data
              ?.sort(sortByPrice)
              .reverse()
              .map((card: any, index: number) => {
                return (
                  <Cards
                    key={index}
                    admin={admin}
                    id={card.id}
                    name={card.name_car}
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
