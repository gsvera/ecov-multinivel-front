import CryptoJS from "crypto-js";

const secretKeyPass = process.env.NEXT_PUBLIC_SECRET_KEY;

export const parsePasswordEncrypt = (text) => {
  const key = CryptoJS.enc.Utf8.parse(secretKeyPass);

  // Cifrar el texto
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};
