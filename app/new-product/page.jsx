import Link from "next/link";

const NewProductPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-slate-400 h-16 flex items-center px-4">
        <button className="h-12 py-1 px-2 rounded-lg bg-cyan-300">
          <Link href="/products">Ürünler</Link>
        </button>
        <h1 className="absolute left-24 right-24 text-center font-medium">
          Ürün Ekle
        </h1>
      </header>
      <main className="w-full bg-slate-300 h-screen-4rem overflow-y-scroll">
        <div className="flex flex-col items-center justify-center"></div>
      </main>
    </div>
  );
};

export default NewProductPage;
