import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { QrCOdeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";

export default function QrCode() {
  const [shouldRender, setShouldRender] = useState(false);
  const [data, setData] = useState("");
  const ref = useRef(null);

  const [qrCodeResult, setQrCodeResult] = useRecoilState(QrCOdeReaderState);

  const onReadResult = (result, error) => {
    if (!result) {
      return;
    }
    setData(result.text);
    // console.log(result.text);
    if (!qrCodeResult) {
      setQrCodeResult(result.text);
    }
    window.location.href = "/storeManage/qrCodeResult";
    if (!!error) {
      console.info(error);
    }
  };

  return (
    <Layout
      sideItems={[
        { text: "매장 관리", url: "/storeManage" },
        { text: "QR 태그", url: "/storeManage/qrCode" },
      ]}
    >
      {!data && (
        <>
          <QrReader
            scanDelay={1000}
            constraints={{ facingMode: "environment" }}
            onResult={onReadResult}
            style={{ width: "100%" }}
            ref={ref}
          />
        </>
      )}
      <p>{qrCodeResult}</p>
      <button
        onClick={() => {
          setShouldRender(true);
        }}
      >
        Render QR{" "}
      </button>
    </Layout>
  );
}
