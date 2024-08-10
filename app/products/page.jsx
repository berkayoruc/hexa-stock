"use client";

import { useEffect, useState } from "react";
import ProductButton from "../components/buttons/ProductButton";
import { logout } from "./actions";
import { getProductsSSR } from "./actions";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const ssrProducts = await getProductsSSR();
    setProducts(ssrProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-slate-400 h-16 flex justify-between items-center px-4">
        <button className="h-12 w-12 p-1 rounded-lg bg-cyan-300"></button>
        <input className="w-1/2 h-12 bg-slate-300 rounded-lg" type="text" />
        <form action={logout}>
          <button className="h-12 w-12 p-1 rounded-lg bg-cyan-300"></button>
        </form>
      </header>
      <main className="w-full bg-slate-300 h-screen-4rem overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 p-2 gap-2">
        {products.map((product) => (
          <ProductButton key={product.id} product={product} />
        ))}
        {!products.length && <h1>{"No data"}</h1>}
      </main>
    </div>
  );
};

export default ProductsPage;
