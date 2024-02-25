"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

type Pet = {
  key: string;
  value: string;
};

const Scanner = () => {
  const [activeKey, setActiveKey] = useState<string>("");
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [values, setValues] = useState<Pet>({
    key: "",
    value: "",
  });
  let scannerInstance: Html5QrcodeScanner | null = null;

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    if (isRendered && activeKey !== "") {
      // Pastikan activeKey tidak kosong sebelum memulai pemindaian
      startScanner();
    }
  }, [activeKey]); // Gunakan activeKey sebagai dependensi

  const startScanner = () => {
    if (!scannerInstance) {
      scannerInstance = new Html5QrcodeScanner(
        "render",
        {
          fps: 5,
          qrbox: { width: 250, height: 250 },
        },
        /* verbose= */ false
      );

      scannerInstance.render(onScanSuccess, onScanError);
    }
  };

  const stopScanner: () => void = () => {
    scannerInstance?.clear();
  };

  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(activeKey); // Pastikan bahwa activeKey di sini benar-benar sesuai dengan yang diharapkan
    setValues((prevValues) => ({
      ...prevValues,
      [activeKey]: decodedText,
    }));
    stopScanner();
    // Di sini Anda dapat menangani hasil pemindaian QR
  };

  const onScanError = (errorMessage: string) => {
    // Di sini Anda dapat menangani kesalahan pemindaian QR
  };

  useEffect(() => {
    if (isRendered) {
      return () => {
        if (scannerInstance) {
          stopScanner();
        }
      };
    }
  }, [isRendered]);

  return (
    <div className="text-black">
      <div id="render" className="text-black"></div>
      <div>
        {Object.keys(values).map((key, index) => (
          <button
            className="w-full"
            key={index}
            onClick={() => setActiveKey(key)}
          >
            Start {key} | {(values as any)[key]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Scanner;
