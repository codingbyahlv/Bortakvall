import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Pageheading from "../components/Pageheading";
import ProductItem from "../components/ProductItem";
import { getTag as ProductsAPI_getTag } from "../services/ProductsAPI";
import { Product } from "../types/Product.types";
import { useParams } from "react-router-dom";

const TagProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id, name } = useParams();

  useEffect(() => {
    getTag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //GET - all products with specific tag
  const getTag = async () => {
    const parsedId = +id!;
    try {
      const respData = await ProductsAPI_getTag(parsedId);
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
      <Pageheading heading={name!} />
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

export default TagProducts;
