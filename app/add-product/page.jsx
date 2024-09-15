"use client";

import { useEffect, useState } from "react";
import { updateProduct } from "./actions";
import { getProductSSR } from "../common/actions";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { BackButton } from "../components";

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
    <div className="flex flex-col h-svh">
      <header className="w-full bg-slate-400 h-16 flex items-center px-4">
        <BackButton />
        <h1 className="absolute left-24 right-24 text-center font-medium">
          Stok Ekle
        </h1>
      </header>
      <main className="w-full bg-slate-300 h-svh-4rem overflow-y-scroll">
        <form className="max-w-sm mx-auto flex flex-col gap-8">
          <FloatLabel className="mt-6 w-full">
            <InputText
              id="name"
              readOnly
              name="name"
              placeholder="Ürün adını giriniz"
              required
              value={product?.name}
              className="w-full cursor-not-allowed rounded"
            />
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Ürün Adı"}
            </label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputNumber
              showButtons
              buttonLayout="horizontal"
              step={0.25}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              required
              id="purchase_price"
              name="purchase_price"
              value={parseFloat(product?.purchase_price)}
              min={0}
              // onValueChange={(e) => setCount(e.target.value)}
              className="rounded w-full"
            />
            <label
              htmlFor="purchase_price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Alış Fiyatı"}
            </label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputNumber
              showButtons
              buttonLayout="horizontal"
              step={1}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              required
              id="count"
              name="count"
              value={parseInt(product?.count)}
              min={0}
              onValueChange={(e) => {
                setProduct({ ...product, count: e.target.value });
              }}
              className="rounded w-full"
            />
            <label
              htmlFor="count"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Adet"}
            </label>
          </FloatLabel>
          <InputText
            type="text"
            className="hidden"
            id="id"
            name="id"
            value={product?.id}
          />
          <div className="mb-5">{product?.category?.name}</div>
          <Button label="Ürün Ekle" formAction={updateProduct} type="submit" />
        </form>
      </main>
    </div>
  );
};

export default AddProductPage;
