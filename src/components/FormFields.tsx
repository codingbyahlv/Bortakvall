import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ValidationState } from "../pages/Checkout";
import { Order } from "../types/Order.types";

type FormProps = {
  orderData: Order;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationState: ValidationState;
  isValidated: boolean;
};

const FormFields: React.FC<FormProps> = ({
  orderData,
  onChange,
  validationState,
  isValidated,
}) => {
  return (
    <>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="customer_first_name">Förnamn</Form.Label>
          <Form.Control
            required
            id="customer_first_name"
            name="customer_first_name"
            type="text"
            placeholder="Förnamn"
            value={orderData.customer_first_name}
            onChange={onChange}
            isValid={validationState.customer_first_name}
            isInvalid={isValidated && !validationState.customer_first_name}
          />
          <Form.Control.Feedback type="invalid">
            Du måste ange förnamn!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="customer_last_name">Efternamn</Form.Label>
          <Form.Control
            id="customer_last_name"
            name="customer_last_name"
            required
            type="text"
            placeholder="Efternamn"
            value={orderData.customer_last_name}
            onChange={onChange}
            isValid={validationState.customer_last_name}
            isInvalid={isValidated && !validationState.customer_last_name}
          />
          <Form.Control.Feedback type="invalid">
            Du måste ange efternamn!
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group>
        <Form.Label htmlFor="customer_address">Adress</Form.Label>
        <Form.Control
          id="customer_address"
          name="customer_address"
          required
          type="text"
          placeholder="Adress"
          value={orderData.customer_address}
          onChange={onChange}
          isValid={validationState.customer_address}
          isInvalid={isValidated && !validationState.customer_address}
        />
        <Form.Control.Feedback type="invalid">
          Du måste ange en adress!
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="customer_postcode">Postnummer</Form.Label>
          <Form.Control
            id="customer_postcode"
            name="customer_first_name"
            required
            type="text"
            placeholder="Postnummer"
            value={orderData.customer_postcode}
            onChange={onChange}
            isValid={validationState.customer_postcode}
            isInvalid={isValidated && !validationState.customer_postcode}
          />
          <Form.Control.Feedback type="invalid">
            Du måste ange ett korrekt postnummer!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="customer_city">Stad</Form.Label>
          <Form.Control
            id="customer_city"
            name="customer_city"
            required
            type="text"
            placeholder="Stad"
            value={orderData.customer_city}
            onChange={onChange}
            isValid={validationState.customer_city}
            isInvalid={isValidated && !validationState.customer_city}
          />
          <Form.Control.Feedback type="invalid">
            Du måste ange en stad!
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="customer_email">E-post</Form.Label>
          <Form.Control
            id="customer_email"
            name="customer_email"
            required
            type="text"
            placeholder="E-post"
            value={orderData.customer_email}
            onChange={onChange}
            isValid={validationState.customer_email}
            isInvalid={isValidated && !validationState.customer_email}
          />
          <Form.Control.Feedback type="invalid">
            Du måste ange en giltig e-postadress!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="customer_phone">Telefonnummer</Form.Label>
          <Form.Control
            id="customer_phone"
            name="customer_phone"
            type="text"
            placeholder="Telefonnummer"
            value={orderData.customer_phone}
            onChange={onChange}
            isInvalid={isValidated && !validationState.customer_phone}
          />
          <Form.Control.Feedback type="invalid">
            Du måste ange ett giltigt telefonnummer!
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
};

export default FormFields;
