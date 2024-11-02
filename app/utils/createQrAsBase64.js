const QRCode = require("qrcode");

const createQRCodeAsBase64 = async (url) =>
  await QRCode.toDataURL(url, { errorCorrectionLevel: "H" });

export { createQRCodeAsBase64 };
