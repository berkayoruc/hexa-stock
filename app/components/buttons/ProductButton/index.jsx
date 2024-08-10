import Link from "next/link";

export default function ProductButton({ product }) {
  return (
    // <button className="flex flex-col items-center justify-center w-full h-fit bg-white">
    //   <Link href={`/product?id=${product?.id}`}>
    //     <div className="h-9 w-9 rounded-md bg-amber-200"></div>
    //     <span>{product?.name}</span>
    //   </Link>
    // </button>
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-48">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
          alt="card-image"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {product?.name}
          </p>
          <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            $95.00
          </p>
        </div>
      </div>
      <div class="p-6 pt-0 flex flex-col gap-2">
        <button class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bg-blue-300">
          <Link href={`/add-product?id=${product?.id}`}>Stok Ekle</Link>
        </button>
        <button class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bg-green-300">
          <Link href={`/product?id=${product?.id}`}>Satış Yap</Link>
        </button>
      </div>
    </div>
  );
}
