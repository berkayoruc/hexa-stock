"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import PurchaseProductModal from "@products/modals/PurchaseProductModal";
import SellProductModal from "@products/modals/SellProductModal";

export default function ProductButton({ product, getProducts }) {
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  const qrCodeRef = useRef(null);

  const parseURL = () => {
    const { id } = product;
    if (typeof id !== "number") {
      return;
    }
    return `${window.location.origin}/product?id=${id}`;
  };

  const handleQrCodeDownload = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${product.name}-${product.id}-qr-code.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating while QR code:", error);
      });
  };

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full h-fit">
      {/* <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-48">
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </div> */}
      <div className="p-6">
        <div className="flex flex-col items-center mb-2">
          <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-blue-gray-900">
            {product?.name}
          </p>
          <p className="block font-sans text-sm italic antialiased font-light leading-relaxed text-gray-400">
            {product?.category?.name}
          </p>
          <div className="flex justify-between items-center gap-1">
            <p className="text-sm">Alış:</p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              {`${product?.purchase_price}₺${
                product?.purchase_dollar_price
                  ? ` / $${(product?.purchase_price/product?.purchase_dollar_price).toFixed(2)}`
                  : ""
              }`}
            </p>
          </div>
          <div className="flex justify-between items-center gap-1">
            <p className="text-sm">Stok:</p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              {product?.count}
            </p>
          </div>
          {product?.updated_at && (
            <span className="text-sm">
              {new Date(product?.updated_at).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className="p-6 pt-0 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <Link
            className="w-full pro-max:w-fit pro-max:grow"
            href={`/product?id=${product?.id}`}
          >
            <Button
              className="w-full rounded-lg"
              label="Ürüne Git"
              severity="info"
              outlined
            />
          </Link>
          <Button
            className="hidden pro-max:block rounded-lg w-10 h-10"
            severity="contrast"
            outlined
            aria-label="QR kodu göster"
            icon="pi pi-qrcode"
            tooltip="QR göster"
            tooltipOptions={{ position: "bottom" }}
            onClick={() => setShowQrModal(true)}
          />
        </div>
        {/* <Link href={`/add-product?id=${product?.id}`}>
          <Button className="w-full rounded-lg" label="Stok Ekle" />
        </Link> */}
        <Dialog
          visible={showPurchaseModal}
          onHide={() => setShowPurchaseModal(false)}
          dismissableMask
          header="Stok Ekle"
          draggable={false}
          className="min-w-[60svw]"
        >
          <PurchaseProductModal
            product={product}
            onClose={() => setShowPurchaseModal(false)}
            getProducts={getProducts}
          />
        </Dialog>
        <Button
          className="w-full rounded-lg"
          label="Stok Ekle"
          onClick={(e) => {
            e.preventDefault();
            setShowPurchaseModal(true);
          }}
        />
        <Dialog
          visible={showSellModal}
          onHide={() => setShowSellModal(false)}
          dismissableMask
          header="Ürün Sat"
          draggable={false}
          className="min-w-[60svw]"
        >
          <SellProductModal
            product={product}
            onClose={() => setShowSellModal(false)}
            getProducts={getProducts}
          />
        </Dialog>
        <Button
          className="w-full rounded-lg"
          disabled={!product?.count}
          onClick={(e) => {
            e.preventDefault();
            if (product?.count === 0) return;
            setShowSellModal(true);
          }}
          label="Satış Yap"
          severity="success"
        />
      </div>
      <Dialog
        showHeader={false}
        dismissableMask
        draggable={false}
        resizable={false}
        visible={showQrModal}
        onHide={() => setShowQrModal(false)}
        footer={
          <div className="flex gap-1 items-center justify-end">
            <Button
              label="Kapat"
              size="small"
              aria-label="QR kodu kapat"
              outlined
              severity="secondary"
              onClick={() => {
                // fetch(
                //   "https://latest.currency-api.pages.dev/v1/currencies/usd.min.json"
                // )
                //   .then((response) => response.json())
                //   .then((data) => console.log(data.usd.try));
                setShowQrModal(false);
              }}
            />
            <Button
              label="Yazdır"
              size="small"
              aria-label="QR kodu yazdır"
              onClick={handleQrCodeDownload}
            />
          </div>
        }
      >
        <div
          ref={qrCodeRef}
          className="pt-10 pb-2 px-4 bg-white flex flex-col gap-2 items-center"
        >
          <QRCode value={parseURL()} size={300} />
          <h5 className="font-bold text-lg">{product?.name}</h5>
        </div>
      </Dialog>
    </div>
  );
}
