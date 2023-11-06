import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiCart } from "react-icons/bi";
import CartProducts from "./CartProducts";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart } = useCart();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //TOTAL AMOUNT
  const productsInCart = () => {
    let sum = 0;
    cart?.forEach((item) => {
      if (item.amount) {
        sum += item.amount;
      }
    });
    return sum;
  };

  return (
    <>
      <Button onClick={handleShow} className="button">
        <span className="cartTxt">varukorg</span>
        <BiCart className="cartIcon" />
        <Badge bg="light" className="badge">
          {productsInCart()}
        </Badge>
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        scroll={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Din varukorg</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvasBody">
          {cart?.length === 0 && <p className={"mb-4"}>Din varukorg är tom</p>}
          <CartProducts />
          {cart?.length !== 0 && (
            <NavLink to="/checkout" className="checkoutBtn">
              <Button onClick={handleClose} variant="success" className="me-2">
                Till kassan
              </Button>
            </NavLink>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
