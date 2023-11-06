import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Pageheading from "../components/Pageheading";
import ProductItem from "../components/ProductItem";
import { getTag as ProductsAPI_getTag } from "../services/ProductsAPI";
import { Product } from "../types/Product.types";

const Gelatinfri = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTag();
  }, []);

  //GET - all products with specific tag
  const getTag = async () => {
    try {
      const respData = await ProductsAPI_getTag(113);
      if (respData.status === "success") {
        setProducts(respData.data.products);
        setIsLoading(false);
      }
    } catch {
      alert("Something wrong. Try later!");
    }
  };

  return (
    <>
      <Pageheading heading="Gelatinfri" />
      <section className="container">
        {isLoading ? (
          <div className=" productsWrapper mt-3 align-items-center justify-content-center">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <div className=" productsWrapper mt-3 justify-space-between">
            {products?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Gelatinfri;
