"use client";

export default function ProductButton({ children }) {
  return (
    <button
      onClick={() => console.log("berkay")}
      className="flex flex-col items-center justify-center"
    >
      <div className="h-9 w-9 rounded-md bg-amber-200"></div>
      <span>Item 1</span>
    </button>
  );
}
