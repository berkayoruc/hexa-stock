"use client";

import { createProduct, getCategoriesSSR } from "@products/actions";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

const AddProductModal = ({ fnGetProducts, onClose }) => {
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
    <form className="flex flex-col gap-4">
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
        formAction={async (product) => {
          const status = await createProduct(product);
          if (status === 201 && fnGetProducts) {
            fnGetProducts();
          }
        }}
        className="w-full"
        label="Ürün Ekle"
        type="submit"
        onClick={onClose}
      />
    </form>
  );
};

export default AddProductModal;
