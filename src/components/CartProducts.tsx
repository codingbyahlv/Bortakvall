import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { FaTrash } from "react-icons/fa6";
import { useCart } from "../hooks/useCart";

const CartProducts = () => {
  const {
    cart,
    removeProduct,
    incrementAmount,
    decrementAmount,
    alertMsg,
    handleAlertMsg,
  } = useCart();
  const [showCartAlert, setShowCartAlert] = useState(false);

  useEffect(() => {
    handleAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMsg]);

  //ALERT for trying to shop more than stock_quantity
  const handleAlert = () => {
    if (alertMsg === "errorCart") {
      setShowCartAlert(true);
      handleAlertMsg(null);
    }
    setTimeout(() => {
      setShowCartAlert(false);
    }, 6000);
  };

  //TOTAL AMOUNT
  const totalSum = () => {
    let sum = 0;
    cart?.forEach((item) => {
      if (item.amount) {
        sum += item.price * item.amount;
      }
    });
    return sum;
  };

  return (
    <div className="cart">
      {showCartAlert && (
        <p className="alert alert-danger mt-2" role="alert">
          Du försöker beställa mer än vad som finns i lager. Antalet i din
          varukorg justeras.
        </p>
      )}
      <ListGroup variant="flush" className="cartProducts">
        {cart?.map((product, index) => (
          <ListGroup.Item key={index} className="listGroupItem">
            <div className="top">
              <div>
                <p>{product.name}</p>
                <p className="price">á pris {product.price}:-</p>
              </div>
              <Button
                variant="outline-danger"
                onClick={() => removeProduct(product)}
              >
                <FaTrash />
              </Button>
            </div>
            <div className="btnPriceGroup">
              <div className="btnGroup">
                <Button
                  variant="warning"
                  onClick={() => decrementAmount(product)}
                >
                  -
                </Button>
                <p className="btn amount">{product.amount}</p>
                <Button
                  variant="warning"
                  onClick={() => incrementAmount(product)}
                >
                  +
                </Button>
              </div>
              <div>
                <p className="itemTotal">{product.total_price}:-</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {cart?.length !== 0 && (
        <p className="border-top pt-3 orderTotal">
          Totalsumma: {totalSum()} SEK
        </p>
      )}
    </div>
  );
};

export default CartProducts;
