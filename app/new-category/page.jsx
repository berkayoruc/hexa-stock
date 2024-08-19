import Link from "next/link";
import { createCategory } from "./actions";

const NewCategoryPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-slate-400 h-16 flex items-center px-4">
        <button className="h-12 py-1 px-2 rounded-lg bg-cyan-300">
          <Link href="/products">Ürünler</Link>
        </button>
        <h1 className="absolute left-24 right-24 text-center font-medium">
          Kategori Ekle
        </h1>
      </header>
      <main className="w-full bg-slate-300 h-screen-4rem overflow-y-scroll">
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {"Kategori Adı"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Kategori adını girin"
              required
            />
          </div>
          <button
            formAction={createCategory}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {"Kategori Ekle"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewCategoryPage;
