import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Cart from "./Cart";
import logo from "../assets/images/logo.png";

const Navigation = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <NavLink to="/" className="logoLink">
          <img src={logo} className="logo" />
        </NavLink>
        <Cart />
      </Container>
    </Navbar>
  );
};

export default Navigation;
