"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProductSSR } from "../common/actions";

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
    <div className="flex flex-col h-svh">
      <header className="w-full bg-slate-400 h-16 flex justify-between items-center px-4">
        <Link href="/products">
          <button className="h-12 px-2 rounded-lg bg-cyan-300">Geri dön</button>
        </Link>
      </header>
      <main className="w-full bg-slate-300 h-svh-4rem overflow-y-scroll">
        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-48 bg-amber-200 rounded-md"></div>
          <h1>{product?.name}</h1>
          <h2>{product?.price}</h2>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
