"use client";

import { useEffect, useState } from "react";
import { getProductSSR } from "../common/actions";
import { BackButton } from "../components";
import QRCode from "react-qr-code";

const ProductPage = ({}) => {
  const [product, setProduct] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    if (!id) {
      return;
    }
    setUrl(window.location.href);
  }, []);

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
        <BackButton />
      </header>
      <main className="w-full bg-slate-300 h-svh-4rem overflow-y-scroll p-2">
        <div className="flex w-full justify-between items-start gap-4">
          {url ? (
            <QRCode value={url} size={300} />
          ) : (
            <div className="h-80 w-80 bg-amber-200 rounded-md"></div>
          )}
          <div
            className="flex flex-col items-start justify-center mt-2 gap-2"
            style={{ width: "calc(100% - 320px)" }}
          >
            <h1 className="font-bold text-3xl">{product?.name}</h1>
            <span className="font-medium text-xl">{`Maliyet: ${
              product?.purchase_price ?? "-"
            }₺`}</span>
            <span className="font-medium text-xl">{`Stok: ${
              product?.count ?? "-"
            }`}</span>
            {product?.category?.name && (
              <span className="font-medium text-lg italic font-sans text-gray-500">
                {product.category.name}
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
