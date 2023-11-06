import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import AlertBox from "./AlertBox";
import { useCart } from "../hooks/useCart";
import { getAllTags as ProductsAPI_getAllTags } from "../services/ProductsAPI";
import { Tag } from "../types/Product.types";

type PageHeadingProps = {
  heading: string;
};

const Pageheading: React.FC<PageHeadingProps> = ({ heading }) => {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const { alertMsg, handleAlertMsg } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getAllTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMsg]);

  //ALERT - for trying to shop more than stock_quantity
  const handleAlert = (close?: string) => {
    if (close === "close") {
      setShowAlert(false);
    }
    if (alertMsg === "error") {
      setShowAlert(true);
      handleAlertMsg(null);
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 8000);
  };

  //GET - all the product tags
  const getAllTags = async () => {
    try {
      const data = await ProductsAPI_getAllTags();
      if (data.status === "success") {
        setTags(data.data);
      }
    } catch {
      alert("Something wrong. Try later!");
    }
  };

  return (
    <section className="pageheading">
      <div className="bg">
        <h3 className="container">{heading}</h3>
      </div>
      <Dropdown className="container">
        <Dropdown.Toggle
          variant="outline-secondary mt-3 mb-3"
          id="dropdown-basic"
        >
          Visa kategori
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <NavLink to="/" className="dropdown-item">
            Alla produkter
          </NavLink>
          {tags?.map((tag, index) => (
            <NavLink key={index} to={`/${tag.slug}`} className="dropdown-item">
              {tag.name}
            </NavLink>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {showAlert && (
        <AlertBox
          heading={"Oh no!"}
          children={
            <p>
              Du försöker beställa fler produkter än vad som finns i lager.
              Antalet i din varukorg justeras.
            </p>
          }
          handleAlert={handleAlert}
        />
      )}
    </section>
  );
};

export default Pageheading;
