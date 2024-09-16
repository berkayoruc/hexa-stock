"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Button } from "primereact/button";
// import QrFrame from "qr-frame.svg";

const QrReader = () => {
  const scanner = useRef();
  const videoRef = useRef(null);
  const qrBoxRef = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Result
  const [scannedResult, setScannedResult] = useState("");

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
    setScannedResult("");
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
    <div className="flex flex-col gap-3">
      <div className="w-full h-full mx-0 my-auto">
        <video className="w-full h-full object-cover" ref={videoRef}></video>
        <div ref={qrBoxRef} className="w-full left-0">
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
          label="Ürüne git"
          aria-label="Ürün sayfasını aç"
          outlined
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
