"use client";

import { useEffect, useState } from "react";
import ProductButton from "../components/buttons/ProductButton";
// import { logout } from "./actions";
import { getProductsSSR, logout } from "./actions";
import Link from "next/link";
import MenuModal from "./modals/MenuModal";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

const ProductsPage = () => {
  const [ssrProducts, setSsrProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuModal, setMenuModal] = useState(null);
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
            onClick={() =>
              setMenuModal(
                <MenuModal setMenuModal={setMenuModal} logout={logout} />
              )
            }
            tooltip="Menü"
            tooltipOptions={{ position: "bottom" }}
          />
          {/* <button
            onClick={() =>
              setMenuModal(
                <MenuModal setMenuModal={setMenuModal} logout={logout} />
              )
            }
            className="h-12 w-12 p-1 rounded-lg bg-white text-sm font-medium flex items-center justify-center text-center border border-gray-400 text-gray-900"
          >
            Menü
          </button> */}
          <input
            className="w-1/2 h-12 bg-slate-300 rounded-lg pl-2"
            type="text"
            placeholder="Ürün ara"
            onChange={handleInputChange}
            value={searchItem}
          />
          <Link href="/new-product">
            <Button
              className="rounded-lg w-12 h-12"
              aria-label="Ekle"
              icon="pi pi-plus"
              tooltip="Ekle"
              tooltipOptions={{ position: "bottom" }}
            />
          </Link>
        </header>
        <div className="w-full h-12 flex items-center justify-start px-4 bg-slate-200">
          <label className="flex items-center justify-start gap-1 text-sm font-medium mr-2">
            {"Stoktakiler"}
          </label>
          <Checkbox checked={inStockChecked} onChange={handleStockChange} />
        </div>
        <main className="w-full bg-slate-300 h-svh-7rem overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 p-2 gap-2">
          {loading && <p>{"Yükleniyor..."}</p>}
          {products.map((product) => (
            <ProductButton
              key={product.id}
              product={product}
              setMenuModal={setMenuModal}
              sellOnClose={() => {
                getProducts();
                setMenuModal(null);
              }}
            />
          ))}
        </main>
      </div>
      {menuModal && menuModal}
    </>
  );
};

export default ProductsPage;
