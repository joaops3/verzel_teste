import React, { useEffect, useState, useContext } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import Button from "../UI/buttons/ButtonHeader";
import { BiUserCircle } from "react-icons/bi";
import { BsFillBasketFill } from "react-icons/bs";
import Link from "next/link";
import { AuthContext } from "../../context/AuthProvider";
import { getToken } from "../../helpers/auth";
import Image from "next/image";

interface Props {
  fixed?: boolean;
}

const Header: React.FC<Props> = ({ fixed }) => {
  const { isLogged, logout, user } = useContext(AuthContext);
  const [colorHeader, setColorHeader] = useState<boolean>(false);
  const [headerClass, setHeaderClass] = useState<string>("header");
  const [userid, setUserId] = useState(getToken);
  
  const showHeader = () => {
    let top = window.innerHeight * 0.75;

    if (window.scrollY > 400) {
      setColorHeader(true);
    }
    if (window.scrollY * 0.75 < 400) {
      setColorHeader(false);
    }
  };

  useEffect(() => {
    if (fixed) {
      setHeaderClass("header-fixed");
    }
    window.addEventListener("scroll", showHeader);
    return () => {
      window.removeEventListener("scroll", showHeader);
    };
  }, [userid, user]);

  return (
    <>
      <header>
        <Navbar
          className={`${headerClass}${colorHeader ? "-active" : ""}`}
          fixed={fixed ? "top" : undefined}
          expand="lg"
        >
          <Container>
            <Navbar.Brand href="/">
              <Image
                src={"/images/logo.svg"}
                width={150}
                height={60}
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              className={"justify-content-end"}
              id="navbarScroll"
            >
              <Nav
                className="nav-links me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link className={"links"} href="#action1">
                  Home
                </Nav.Link>
                <Nav.Link href="#action2" className={"links"}>
                  Vantagens
                </Nav.Link>
                <Nav.Link href="#action3" className={"links"}>
                  Produtos
                </Nav.Link>
                <Nav.Link href="#action4" className={"links"}>
                  Sobre
                </Nav.Link>
              </Nav>
              <Nav>
                {isLogged ? (
                  <>
                    {user?.admin && (
                      <Nav.Link
                        href={`/product/register`}
                        className="position-relative header-login"
                      >
                        Cadastrar Veículo
                      </Nav.Link>
                    )}
                    <NavDropdown
                      className={"links"}
                      title={<BiUserCircle size={30} className="links" />}
                      id="navbarScrollingDropdown"
                    >
                      <NavDropdown.Item>
                        <Link href={`#`}>Perfil</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#">
                        <div
                          onClick={() => {
                            logout();
                          }}
                        >
                          {" "}
                          Logout
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <div className="header-user">
                      <Link href="/login" className="header-login">
                        LOGIN
                      </Link>
                      <Link href="/signin" className="header-cadastrar">
                        CADASTRAR
                      </Link>
                    </div>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
