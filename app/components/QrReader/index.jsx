"use client";

import { useRouter } from "next/navigation"; // Usage: App router
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Button } from "primereact/button";
// import QrFrame from "qr-frame.svg";

const QrReader = () => {
  const router = useRouter();
  const scanner = useRef();
  const videoRef = useRef(null);
  const qrBoxRef = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Result
  const [scannedResult, setScannedResult] = useState("");

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    // console.log(err);
    // setScannedResult("");
  };

  useEffect(() => {
    if (videoRef?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoRef?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxRef?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoRef?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="flex flex-col gap-3 w-svw h-svh bg-slate-300">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full qr-reader:w-[360px] h-10 z-30 flex px-4 qr-reader:px-0 justify-between">
        <Button
          aria-label="Geri dön"
          icon="pi pi-arrow-left"
          onClick={() => router.back()}
          tooltip="Geri dön"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          aria-label="Geçmiş urller"
          icon="pi pi-history"
          tooltip="Geçmiş"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
      <div className="w-full qr-reader:w-[430px] h-svh mx-auto my-auto">
        <video className="w-full h-full object-cover" ref={videoRef}></video>
        <div
          ref={qrBoxRef}
          style={{ width: "100% !important", left: "0 !important" }}
        >
          <Image
            src={"/images/qr-frame.svg"}
            alt="QR Frame"
            width={256}
            height={256}
            className="absolute fill-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      {scannedResult && (
        <Button
          className="max-w-full w-fit rounded-md absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
          label={
            scannedResult.includes("hexa-stock.vercel")
              ? "Ürüne git"
              : new URL(scannedResult)?.hostname
          }
          aria-label="Ürün sayfasını aç"
          size="small"
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={() => window.open(scannedResult)}
        />
      )}
    </div>
  );
};

export default QrReader;
