import Link from "next/link";

export default function ProductButton({ product }) {
  return (
    <Link href={`/product?id=${product?.id}`}>
      <button className="flex flex-col items-center justify-center">
        <div className="h-9 w-9 rounded-md bg-amber-200"></div>
        <span>{product?.name}</span>
      </button>
    </Link>
  );
}
