"use client";

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { purchaseProductSSR } from "../actions";

const PurchaseProductModal = ({ product, onClose, getProducts }) => {
  const [count, setCount] = useState(1);
  const [purchasePrice, setPurchasePrice] = useState(
    product?.purchase_price ?? 0
  );

  const purchaseProduct = async () => {
    const newCount = product?.count + count;
    await purchaseProductSSR({
      ...product,
      count: newCount,
      purchase_price: purchasePrice,
    });
    onClose();
    getProducts();
  };

  return (
    <div className="flex flex-col gap-2">
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
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {"Ürün Adı"}
        </label>
      </FloatLabel>
      <FloatLabel className="mt-6 w-full">
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
          onValueChange={(e) => setPurchasePrice(e.target.value)}
          min={0}
          className="rounded w-full"
        />
        <label
          htmlFor="purchase_price"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {"Alış Fiyatı"}
        </label>
      </FloatLabel>
      <FloatLabel className="mt-6 w-full">
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
          value={count}
          onValueChange={(e) => setCount(e.target.value)}
          min={0}
          className="rounded w-full"
        />
        <label
          htmlFor="count"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {"Adet"}
        </label>
      </FloatLabel>
      <div className="flex justify-between items-center gap-2">
        <Button
          size="small"
          label="Stok Ekle"
          aria-label="Stok ekle"
          className="w-full"
          onClick={purchaseProduct}
        />
        <Button
          aria-label="Vazgeç"
          label="Vazgeç"
          className="rounded w-1/2"
          severity="secondary"
          outlined
          size="small"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default PurchaseProductModal;
