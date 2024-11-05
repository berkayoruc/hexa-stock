"use client";

import { useEffect, useState } from "react";

import { createCategory, getProductsSSR, logout } from "./actions";
import Link from "next/link";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dialog } from "primereact/dialog";
import { PDFDocument, ProductButton } from "@components/index";

import { PDFDownloadLink } from "@react-pdf/renderer";

const ProductsPage = () => {
  const [ssrProducts, setSsrProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryAddModal, setShowCategoryAddModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [inStockChecked, setInStockChecked] = useState(false);

  const handleStockChange = (e) => {
    setInStockChecked(e.target.checked);
    if (e.target.checked) {
      const filteredItems = products.filter((product) => product.count > 0);
      setProducts(filteredItems);
    } else {
      setProducts(ssrProducts);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (!searchTerm) {
      setProducts(ssrProducts);
      return;
    }
    const filteredItems = ssrProducts.filter(
      (product) =>
        product.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        product.category.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
    );
    setProducts(filteredItems);
  };

  const getProducts = async () => {
    const ssrProducts = await getProductsSSR();
    setProducts(ssrProducts);
    setSsrProducts(ssrProducts);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col h-svh">
        <header className="w-full bg-slate-400 h-16 flex justify-between items-center px-4">
          <Button
            className="rounded-lg w-12 h-12"
            aria-label="Menü"
            icon="pi pi-bars"
            onClick={() => {
              const threeDProducts = [[], [], []];
              for (let i = 0; i < products.length; i++) {
                const arrayIndex = i % 3;
                threeDProducts[arrayIndex].push(products[i]);
              }
              setShowMenuModal(true);
            }}
            tooltip="Menü"
            tooltipOptions={{ position: "bottom" }}
          />
          <InputText
            type="text"
            className="w-1/2 rounded-lg pl-2"
            placeholder="Ürün ara"
            value={searchItem}
            onChange={handleInputChange}
          />
          <div className="flex gap-2 items-center justify-between">
            <Link href="/qr-scanner">
              <Button
                className="rounded-lg w-12 h-12"
                aria-label="QR kod oku"
                icon="pi pi-camera"
                tooltip="QR oku"
                tooltipOptions={{ position: "bottom" }}
              />
            </Link>
            <Link href="/new-product">
              <Button
                className="rounded-lg w-12 h-12"
                aria-label="Ekle"
                icon="pi pi-plus"
                tooltip="Ekle"
                tooltipOptions={{ position: "bottom" }}
              />
            </Link>
          </div>
        </header>
        <div className="w-full h-12 flex items-center justify-start px-4 bg-slate-200">
          <label className="flex items-center justify-start gap-1 text-sm font-medium mr-2">
            {"Stoktakiler"}
          </label>
          <Checkbox checked={inStockChecked} onChange={handleStockChange} />
        </div>
        <main className="w-full bg-slate-300 h-svh-7rem overflow-y-scroll grid grid-cols-1 pro-max:grid-cols-2 sm:grid-cols-3 p-2 gap-2 sm:gap-4">
          {loading && <p>{"Yükleniyor..."}</p>}
          {products.map((product) => (
            <ProductButton key={product.id} product={product} />
          ))}
        </main>
      </div>
      <Dialog
        visible={showCategoryAddModal}
        onHide={() => setShowCategoryAddModal(false)}
        dismissableMask
        header="Kategori Ekle"
        draggable={false}
        className="min-w-[60svw]"
      >
        <form>
          <FloatLabel className="mt-6 w-full">
            <InputText
              className="w-full"
              id="category_name"
              name="category_name"
            />
            <label htmlFor="category_name">{"Kategori ekle"}</label>
          </FloatLabel>
          <div className="w-full flex justify-end gap-2 mt-6">
            <Button
              label="Vazgeç"
              outlined
              severity="secondary"
              onClick={(e) => {
                e.preventDefault();
                setShowCategoryAddModal(false);
              }}
            />
            <Button
              label="Kaydet"
              formAction={createCategory}
              onClick={() => setShowCategoryAddModal(false)}
            />
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={showMenuModal}
        onHide={() => setShowMenuModal(false)}
        dismissableMask
        header="Stok Kovanı"
        draggable={false}
        className="min-w-[50svw]"
      >
        <div className="flex flex-col items-center justify-start gap-4">
          <Button
            aria-label="Kategori ekle"
            label="Kategori ekle"
            className="w-full rounded"
            onClick={() => {
              setShowMenuModal(false);
              setShowCategoryAddModal(true);
            }}
          />
          <Button
            aria-label="Kategoriler"
            label="Kategoriler"
            className="w-full rounded"
            onClick={() => {
              setShowMenuModal(false);
            }}
          />
          <PDFDownloadLink
            document={
              <PDFDocument
                getProducts={() => {
                  const threeDProducts = [[], [], []];
                  for (let i = 0; i < products.length; i++) {
                    const arrayIndex = i % 3;
                    threeDProducts[arrayIndex].push(products[i]);
                  }
                  return threeDProducts;
                }}
              />
            }
            fileName="tum-qr-code.pdf"
            className="bg-[#2196f3] w-full rounded text-white flex items-center justify-center p-button p-component"
          >
            {({ blob, url, loading, error }) =>
              loading ? "PDF Hazırlanıyor" : "QR Codeları İndir"
            }
          </PDFDownloadLink>
          <div className="w-full justify-end items-end mt-8 flex gap-4">
            <form action={logout} className="w-full">
              <Button
                size="small"
                className="rounded w-full"
                severity="danger"
                aria-label="Çıkış yap"
                label="Çıkış yap"
              />
            </form>
            <Button
              size="small"
              severity="secondary"
              outlined
              aria-label="Kapat"
              label="Kapat"
              onClick={() => setShowMenuModal(false)}
              className="w-full rounded"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductsPage;
