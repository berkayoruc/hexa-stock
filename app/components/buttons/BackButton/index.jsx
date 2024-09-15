import Link from "next/link";
import { Button } from "primereact/button";

const BackButton = ({ href = "/products" }) => {
  return (
    <Link href={href}>
      <Button
        className="rounded-lg w-12 h-12"
        aria-label="Geri dön"
        icon="pi pi-arrow-left"
        tooltip="Geri dön"
        tooltipOptions={{ position: "bottom" }}
      />
    </Link>
  );
};

export default BackButton;
