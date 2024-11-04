import { useState } from "react";
import { sellProductSSR } from "../actions";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const SellProductModal = ({ product, onClose }) => {
  const [count, setCount] = useState(1);
  const [sellValue, setSellValue] = useState(product?.purchase_price ?? 0);

  const sellProduct = async () => {
    const newCount = product.count - count;
    await sellProductSSR({
      ...product,
      count: newCount,
      sold_price: sellValue,
      sell_count: count,
    });
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>{product.name}</h1>
      <h3>{"Stoktaki ürün: " + product.count}</h3>
      <InputNumber
        showButtons
        buttonLayout="horizontal"
        step={1}
        decrementButtonClassName="p-button-danger"
        incrementButtonClassName="p-button-success"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        value={count}
        min={1}
        max={product.count}
        onValueChange={(e) => setCount(e.target.value)}
        className="rounded"
      />
      <InputNumber
        onValueChange={(e) => setSellValue(e.target.value)}
        step={0.25}
        value={sellValue}
        min={0}
        className="rounded"
        currency="TRY"
        mode="currency"
      />
      <div className="flex justify-between items-center gap-2">
        <Button
          size="small"
          label="Sat"
          aria-label="Satış yap"
          severity="danger"
          onClick={sellProduct}
          className="w-full"
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

export default SellProductModal;
