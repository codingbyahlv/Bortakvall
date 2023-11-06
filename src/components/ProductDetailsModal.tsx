import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useCart } from "../hooks/useCart";
import { getProduct as ProductsAPI_getProduct } from "../services/ProductsAPI";
import { Product } from "../types/Product.types";

type ProductModalProps = {
  clickedProduct: Product;
  onClick: () => void;
};
const ProductDetailsModal: React.FC<ProductModalProps> = ({
  clickedProduct,
  onClick,
}) => {
  const { addProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //GET - the clicked product
  const getProduct = async () => {
    try {
      const data = await ProductsAPI_getProduct(clickedProduct.id);
      if (data.status === "success") {
        setProduct(data.data);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch {
      alert("Something wrong. Try later!");
    }
  };

  //CONVERT/REMOVE - the the html-tags from the description
  const convertPtoArray = (text: string | undefined) => {
    if (text !== undefined) {
      text = text.replace(/<p>/g, "\n");
      text = text.replace(/<\/p>/g, "");
      text = text.replace(/<em>/g, "").replace(/<\/em>/g, "");

      const paragraphs: string[] = text
        .split("\n")
        .filter((paragraph) => paragraph.trim() !== "");

      return paragraphs;
    }
    return [];
  };

  return (
    <div>
      <Modal.Header closeButton></Modal.Header>
      {isLoading ? (
        <Modal.Body className="spinnerBox">
          <Spinner animation="border" variant="warning" />
        </Modal.Body>
      ) : (
        <Modal.Body className="modalBody">
          <img src={`https://www.bortakvall.se/${product?.images.large}`} />
          <div>
            <Modal.Title className="mb-4">{product?.name}</Modal.Title>
            {convertPtoArray(product?.description).map((par, index) => (
              <p key={index}>{par}</p>
            ))}
            {product?.tags.length !== 0 ? (
              <div>
                <p className="catHeading">
                  Denna produkt återfinns i dessa kategorier:
                </p>
                <div className="catMap">
                  {product?.tags.map((tag, index) => (
                    <NavLink
                      to={`/${tag.slug}`}
                      key={index}
                      className="fw-light "
                    >
                      {tag.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <p className="fs-5 fw-medium mt-3">{product?.price}:-</p>
            <Button
              className="mt-3 mb-4"
              variant={
                product?.stock_quantity === null
                  ? "outline-secondary"
                  : "success"
              }
              onClick={() => {
                addProduct(clickedProduct);
                onClick();
              }}
              disabled={product?.stock_quantity === null}
            >
              {product?.stock_quantity === null ? "Slut i lager" : "Köp"}
            </Button>
          </div>
        </Modal.Body>
      )}
    </div>
  );
};

export default ProductDetailsModal;
