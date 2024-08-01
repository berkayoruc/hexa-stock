import Link from "next/link";

export default function ProductButton({ product }) {
  return (
    <button className="flex flex-col items-center justify-center w-fit h-fit">
      <Link href={`/product?id=${product?.id}`}>
        <div className="h-9 w-9 rounded-md bg-amber-200"></div>
        <span>{product?.name}</span>
      </Link>
    </button>
  );
}
