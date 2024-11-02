"use client";

import { useEffect, useState } from "react";
import { createProduct, getCategoriesSSR } from "./actions";
import { BackButton } from "../components";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const NewProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategories = async () => {
    const ssrCategories = await getCategoriesSSR();
    setCategories(ssrCategories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col h-svh">
      <header className="w-full bg-slate-400 h-16 flex items-center px-4">
        <BackButton />
        <h1 className="absolute left-24 right-24 text-center font-medium">
          Ürün Ekle
        </h1>
      </header>
      <main className="w-full bg-slate-300 h-svh-4rem overflow-y-scroll">
        <form className="max-w-sm mx-auto flex flex-col gap-4">
          <FloatLabel className="mt-8">
            <InputText
              type="text"
              id="name"
              name="name"
              className="w-full rounded-lg"
              placeholder="Ürün adını girin"
              required
            />
            <label htmlFor="name">{"Ürün Adı"}</label>
          </FloatLabel>
          <FloatLabel className="mt-4">
            <InputNumber
              id="purchase_price"
              name="purchase_price"
              className="w-full"
              inputClassName="rounded-lg"
              placeholder="Alış fiyatını girin"
              required
            />
            <label htmlFor="purchase_price">{"Alış Fiyatı"}</label>
          </FloatLabel>
          <FloatLabel className="mt-4">
            <InputNumber
              id="count"
              name="count"
              className="w-full"
              inputClassName="rounded-lg"
              placeholder="Adet girin"
              required
            />
            <label htmlFor="count">{"Adet"}</label>
          </FloatLabel>
          <Dropdown
            id="categories"
            name="categories"
            placeholder="Kategori seçin"
            options={categories}
            required
            className="rounded-lg"
            optionLabel="name"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
            optionValue="id"
          />
          <Button
            formAction={createProduct}
            className="w-full"
            label="Ürün Ekle"
            type="submit"
          />
        </form>
      </main>
    </div>
  );
};

export default NewProductPage;
