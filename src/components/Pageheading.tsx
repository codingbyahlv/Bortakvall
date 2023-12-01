import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getAllTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    handleAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMsg]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownSelect = () => {
    setDropdownOpen(false);
  };

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
      <Dropdown
        className="container"
        show={dropdownOpen}
        onSelect={handleDropdownSelect}
        onToggle={handleDropdownToggle}
      >
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
            <NavLink
              key={index}
              to={`/tags/${tag.id}/${tag.name}`}
              className="dropdown-item"
            >
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
