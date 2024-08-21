"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { updateProduct } from "./actions";
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
        <Link href="/products">
          <button className="h-12 py-1 px-2 rounded-lg bg-cyan-300">
            Geri dön
          </button>
        </Link>
        <h1 className="absolute left-24 right-24 text-center font-medium">
          Stok Ekle
        </h1>
      </header>
      <main className="w-full bg-slate-300 h-screen-4rem overflow-y-scroll">
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Ürün Adı"}
            </label>
            <input
              type="text"
              id="name"
              readOnly
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ürün adını girin"
              required
              value={product?.name}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="purchase_price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Alış Fiyatı"}
            </label>
            <input
              type="number"
              id="purchase_price"
              name="purchase_price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={parseFloat(product?.purchase_price)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="count"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Adet"}
            </label>
            <input
              type="number"
              id="count"
              name="count"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              min={0}
              max={1000}
              onChange={(e) => {
                setProduct({ ...product, count: e.target.value });
              }}
              value={parseInt(product?.count)}
            />
          </div>
          <input
            type="text"
            className="hidden"
            id="id"
            name="id"
            value={product?.id}
          />
          <div className="mb-5">{product?.category?.name}</div>
          <button
            formAction={updateProduct}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {"Ürün Ekle"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProductPage;
