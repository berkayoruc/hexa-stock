import { useEffect, useState } from "react";
import { sellProductSSR } from "../actions";

const SellProductModal = ({ product, onClose }) => {
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);

  const sellProduct = async () => {
    const newCount = product.count - count;
    await sellProductSSR({ ...product, count: newCount });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-96 flex flex-col gap-1">
        <h1>{product.name}</h1>
        <h3>{product.count}</h3>
        <input
          type="number"
          value={count}
          min={1}
          max={product.count}
          onChange={(e) => {
            if (e.target.value > product.count) {
              setError("Stokta yeterli ürün yok");
              return;
            } else {
              setError(null);
            }
            setCount(e.target.value);
          }}
          className="border rounded"
        />
        {error && <p className="text-red-800">{error}</p>}
        <button className="px-2 py-1 border rounded" onClick={sellProduct}>
          Sat
        </button>
        <button className="px-2 py-1 border rounded" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
};

export default SellProductModal;
