"use client";

// import Link from "next/link";
import { Button } from "primereact/button";
import { PDFDocument } from "../../components";
import { PDFDownloadLink } from "@react-pdf/renderer";

const MenuModal = ({
  setMenuModal,
  logout,
  products,
  setShowCategoryAddModal,
}) => {
  const fnCloseModal = () => setMenuModal(false);

  return (
    <div
      onClick={fnCloseModal}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-3/4 px-4 max-w-96 h-1/2 rounded-lg relative flex flex-col justify-between shadow-lg"
      >
        <div className="mt-4 flex flex-col gap-3">
          <h1 className="text-center mb-2 text-xl font-bold">
            {"Stok Kovanı"}
          </h1>
          {/* <Link href={`/new-category`}> */}
          <Button
            aria-label="Kategori ekle"
            label="Kategori ekle"
            className="w-full rounded"
            onClick={() => {
              setMenuModal(false);
              setShowCategoryAddModal(true);
            }}
          />
          {/* </Link> */}
          <Button
            aria-label="Kategoriler"
            label="Kategoriler"
            className="w-full rounded"
            onClick={fnCloseModal}
          />
          <PDFDownloadLink
            document={<PDFDocument products={products} />}
            fileName="tum-qr-code.pdf"
            className="bg-[#2196f3] w-full rounded text-white flex items-center justify-center p-button p-component"
          >
            {({ blob, url, loading, error }) =>
              loading ? "PDF Hazırlanıyor" : "QR Codeları İndir"
            }
          </PDFDownloadLink>
        </div>
        <div className="flex justify-between gap-4 mb-4">
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
            onClick={fnCloseModal}
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
