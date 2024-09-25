"use client";

import PurchaseProductModal from "@/app/products/modals/PurchaseProductModal";
import SellProductModal from "@/app/products/modals/SellProductModal";
import Link from "next/link";
import { Button } from "primereact/button";

export default function ProductButton({ product, setMenuModal, sellOnClose }) {
  return (
    // <button className="flex flex-col items-center justify-center w-full h-fit bg-white">
    //   <Link href={`/product?id=${product?.id}`}>
    //     <div className="h-9 w-9 rounded-md bg-amber-200"></div>
    //     <span>{product?.name}</span>
    //   </Link>
    // </button>

    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
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
              {product?.purchase_price}₺
            </p>
          </div>
          <div className="flex justify-between items-center gap-1">
            <p className="text-sm">Stok:</p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              {product?.count}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <Link className="w-full pro-max:w-fit pro-max:grow" href={`/product?id=${product?.id}`}>
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
          />
        </div>
        {/* <Link href={`/add-product?id=${product?.id}`}>
          <Button className="w-full rounded-lg" label="Stok Ekle" />
        </Link> */}
        <Button
          className="w-full rounded-lg"
          label="Stok Ekle"
          onClick={(e) => {
            e.preventDefault();
            setMenuModal(
              <PurchaseProductModal product={product} onClose={sellOnClose} />
            );
          }}
        />
        <Button
          className="w-full rounded-lg"
          disabled={!product?.count}
          onClick={(e) => {
            e.preventDefault();
            if (product?.count === 0) return;
            setMenuModal(
              <SellProductModal product={product} onClose={sellOnClose} />
            );
          }}
          label="Satış Yap"
          severity="success"
        />
      </div>
    </div>
  );
}
