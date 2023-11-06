import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ProductDetailsModal from "./ProductDetailsModal";
import { useCart } from "../hooks/useCart";
import { Product } from "../types/Product.types";

type ProductListItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductListItemProps) => {
  const { addProduct } = useCart();
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <>
      <Card style={{ maxWidth: "350px" }} className="productItem">
        <Card.Img
          variant="top"
          className="productThumbnail"
          src={`https://www.bortakvall.se/${product.images.thumbnail}`}
        />
        <Card.Body className="productTxt">
          <Card.Title>{product.name}</Card.Title>
          <div>
            <Card.Text className="fs-5">{product.price}:-</Card.Text>
            <div className="btnWrapper">
              <Button variant="warning" onClick={toggleModal}>
                Läs mer
              </Button>
              <Button
                variant={
                  product?.stock_quantity === null
                    ? "outline-secondary"
                    : "success"
                }
                onClick={() => addProduct(product)}
                disabled={product.stock_quantity === null}
              >
                {product?.stock_quantity === null ? "Slut i lager" : "Köp"}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={toggleModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ProductDetailsModal clickedProduct={product} onClick={toggleModal} />
      </Modal>
    </>
  );
};

export default ProductItem;
