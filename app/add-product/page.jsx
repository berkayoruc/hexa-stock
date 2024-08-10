"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductSSR } from "../common/actions";

const AddProductPage = () => {
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
    <div className="flex flex-col h-screen">
      <header className="w-full bg-slate-400 h-16 flex items-center px-4">
        <button className="h-12 py-1 px-2 rounded-lg bg-cyan-300">
          <Link href="/products">Ürünler</Link>
        </button>
        <h1 className="absolute left-24 right-24 text-center font-medium">Stok Ekle</h1>
      </header>
      <main className="w-full bg-slate-300 h-screen-4rem overflow-y-scroll">
        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-48 bg-amber-200 rounded-md"></div>
          <h1>{product?.name}</h1>
          <h2>{product?.price}</h2>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;
