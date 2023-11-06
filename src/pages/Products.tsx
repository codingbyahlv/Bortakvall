import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Pageheading from "../components/Pageheading";
import ProductItem from "../components/ProductItem";
import { getAllProducts as ProductsAPI_getAllProducts } from "../services/ProductsAPI";
import { Product } from "../types/Product.types";

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  //GET - all products
  const getProducts = async () => {
    try {
      const respData = await ProductsAPI_getAllProducts();
      if (respData.status === "success") {
        setProducts(respData.data);
        setIsLoading(false);
      }
    } catch {
      alert("Something wrong. Try later!");
    }
  };

  return (
    <>
      <Pageheading heading="Alla produkter" />
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

export default Products;
