import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AlertBox from "../components/AlertBox";
import FormFields from "../components/FormFields";
import CartProducts from "../components/CartProducts";
import { useCart } from "../hooks/useCart";
import { OrderProduct, Order } from "../types/Order.types";
import { CartProduct } from "../types/Product.types";
import { postOrder as ProductsAPI_postOrder } from "../services/ProductsAPI";

type ValidationState = {
  [key: string]: boolean | undefined;
};

const Checkout = () => {
  const { customer, handleCustomer, cart, resetCart } = useCart();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const [show, setshow] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [orderData, setOrderData] = useState<Order>({
    customer_first_name: "",
    customer_last_name: "",
    customer_address: "",
    customer_postcode: "",
    customer_city: "",
    customer_email: "",
    customer_phone: "",
    order_total: 0,
    order_items: [],
  });
  const [validationState, setValidationState] = useState<ValidationState>({
    customer_first_name: false,
    customer_last_name: false,
    customer_address: false,
    customer_postcode: false,
    customer_city: false,
    customer_email: false,
    customer_phone: true,
  });

  useEffect(() => {
    convertOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    if (customer) {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        ...customer,
      }));
    }
  }, [customer]);

  const toggleModal = () => {
    setshow(!show);
  };

  //CONVERTING - return types specified just for remembering
  const convertToOrderProduct = (product: CartProduct): OrderProduct => {
    return {
      product_id: product.id,
      qty: product.amount,
      item_price: product.price,
      item_total: product.total_price,
    };
  };

  const convertProductsToOrderProducts = (): OrderProduct[] => {
    if (cart !== null) {
      return cart.map(convertToOrderProduct);
    } else {
      return [];
    }
  };

  const convertOrder = () => {
    const products = convertProductsToOrderProducts();
    const total = products.reduce(
      (total, product) => total + product.item_total,
      0
    );
    setOrderData({ ...orderData, order_total: total, order_items: products });
  };

  //VALIDATIONS
  const validateString255 = (value: string) => {
    if (value.length <= 255 && value.length > 0) {
      return true;
    }
    return false;
  };

  const validateString6 = (value: string) => {
    if (value.length <= 6 && value.length > 0) {
      return true;
    }
    return false;
  };

  const validateEmail = (value: string) => {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (regex.test(value) && value.length > 0) {
      return true;
    }
    return false;
  };

  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let isValid = false;
    switch (id) {
      case "customer_postcode":
        isValid = validateString6(value);
        break;
      case "customer_email":
        isValid = validateEmail(value);
        break;
      default:
        isValid = validateString255(value);
    }

    setValidationState((prev) => ({ ...prev, [id]: isValid }));
  };

  const validationCheck = () => {
    let isValid = false;

    isValid = !Object.values(validationState).some((value) => value === false);

    for (const key in orderData) {
      if (key === "customer_phone") {
        continue;
      }
      if (orderData[key as keyof Order] === "") {
        setValidationState((prev) => ({
          ...prev,
          [key as keyof Order]: false,
        }));
        isValid = false;
      } else {
        setValidationState((prev) => ({
          ...prev,
          [key as keyof Order]: true,
        }));
        isValid = true;
      }
    }

    return isValid;
  };

  //UPDATES
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [id]: value,
    }));
    validateField(e);
  };

  const updateCustomer = () => {
    const updatedCustomer = {
      customer_first_name: orderData.customer_first_name,
      customer_last_name: orderData.customer_last_name,
      customer_address: orderData.customer_address,
      customer_postcode: orderData.customer_postcode,
      customer_city: orderData.customer_city,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
    };
    handleCustomer(updatedCustomer);
  };

  //ON SUBMIT
  const postOrder = async () => {
    try {
      const data = await ProductsAPI_postOrder(orderData);
      if (data.status === "success") {
        setOrderId(data.data.id);
        setshow(true);
      }
    } catch {
      console.log("Oh shit! Something´s wrong 😱");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidated(true);

    let validForm = validationCheck();

    if (orderData.order_items.length === 0) {
      validForm = false;
    }
    if (validForm) {
      postOrder();
    }

    updateCustomer();
  };

  const handleReset = () => {
    resetCart();
    navigate("/");
  };

  return (
    <>
      <section className="container checkout">
        <h2 className="mb-4 mt-4">Slutför din beställning</h2>
        {orderData.order_items.length === 0 ? (
          <AlertBox
            children={
              <>
                <p className="mt-2">
                  Det finns inga produkter i varukorgen. Ingen beställning
                  skickas
                </p>
                <NavLink to="/" className="alert-link">
                  Lägg till produkter
                </NavLink>
              </>
            }
          />
        ) : (
          <CartProducts />
        )}
        <Form noValidate onSubmit={handleSubmit} className="form">
          <FormFields
            orderData={orderData}
            onChange={handleFormChange}
            validationState={validationState}
            isValidated={isValidated}
          />
          <Button type="submit" variant="success" className="mt-3">
            Bekräfta order
          </Button>
        </Form>
      </section>

      <Modal
        show={show}
        onHide={toggleModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          className="modal show confirmModal"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Orderbekräftelse</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
              <p>
                Din order <span className="fw-semibold">#{orderId}</span> är
                skickad och du kan snart hålla utkik efter godsaker i din
                brevlåda
              </p>
              <Button variant="dark" onClick={handleReset}>
                Fortsätt handla
              </Button>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
