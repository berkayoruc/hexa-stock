"use client";

import { useEffect, useState } from "react";
import ProductButton from "../components/buttons/ProductButton";
// import { logout } from "./actions";
import { getProductsSSR, logout } from "./actions";
import Link from "next/link";

const ProductsPage = () => {
  const [ssrProducts, setSsrProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuModal, setMenuModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");

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
      <div className="flex flex-col h-screen">
        <header className="w-full bg-slate-400 h-16 flex justify-between items-center px-4">
          <button
            onClick={() => setMenuModal(true)}
            className="h-12 w-12 p-1 rounded-lg bg-white text-sm font-medium flex items-center justify-center text-center border border-gray-400 text-gray-900"
          >
            Menü
          </button>
          <input
            className="w-1/2 h-12 bg-slate-300 rounded-lg pl-2"
            type="text"
            placeholder="Ürün ara"
            onChange={handleInputChange}
            value={searchItem}
          />
          <Link href="/new-product">
            <button className="h-12 w-12 p-1 rounded-lg bg-white text-sm font-medium flex items-center justify-center text-center border border-gray-400 text-gray-900">
              Ekle
            </button>
          </Link>
        </header>
        <main className="w-full bg-slate-300 h-screen-4rem overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 p-2 gap-2">
          {loading && <p>{"Yükleniyor..."}</p>}
          {products.map((product) => (
            <ProductButton key={product.id} product={product} />
          ))}
        </main>
      </div>
      {menuModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/4 h-1/2 rounded-lg relative flex flex-col gap-3">
            <button
              onClick={() => setMenuModal(false)}
              className="absolute top-2 right-2"
            >
              X
            </button>
            <Link href={`/new-category`}>
              <button className="mt-12 mx-4 rounded py-2 border border-gray-400 bg-white ">
                Kategori ekle
              </button>
            </Link>
            <button
              onClick={() => setMenuModal(false)}
              className="mx-4 rounded py-2 border border-gray-400 bg-white "
            >
              Kategoriler
            </button>
            <form action={logout}>
              <button
                style={{ width: "calc(100% - 2rem)" }}
                className="mx-4 rounded py-2 border border-gray-400 bg-white "
              >
                Çıkış
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
