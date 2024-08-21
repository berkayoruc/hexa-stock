import Link from "next/link";

const MenuModal = ({ setMenuModal, logout }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-3/4 h-1/2 rounded-lg relative flex flex-col gap-3">
        <button
          onClick={() => setMenuModal(false)}
          className="absolute top-2 right-2"
        >
          X
        </button>
        <Link
          href={`/new-category`}
          className="mt-12 mx-4 rounded py-2 border border-gray-400 bg-white2"
        >
          <button className="flex items-center justify-center text-center w-full h-full">
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
  );
};

export default MenuModal;
