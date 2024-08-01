"use client";

import { useEffect, useState } from "react";
import { getProductSSR } from "./actions";

const ProductPage = ({}) => {
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const productSSR = await getProductSSR(id);
    setProduct(productSSR);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h1>{"Product Page"}</h1>
      {product && (
        <>
          <h2>{product.name}</h2>
        </>
      )}
    </div>
  );
};

export default ProductPage;
