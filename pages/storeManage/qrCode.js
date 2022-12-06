import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { QrCodeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";

export default function QrCode() {
  const [data, setData] = useState("");

  const [qrCodeResult, setQrCodeResult] = useRecoilState(QrCodeReaderState);

  const onReadResult = (result, error) => {
    if (!result) {
      return;
    }
    setData(result.text);
    console.log(result.text);
    if (!qrCodeResult) {
      setQrCodeResult(() => {
        return result.text;
      });
      if (!!error) {
        console.info(error);
      }
    }
  };

  return (
    <Layout
      sideItems={[
        { text: "매장 관리", url: "/storeManage" },
        { text: "매장 수정", url: "/storeManage/edit" },
        { text: "QR 태그", url: "/storeManage/qrCode" },
      ]}
    >
      {!data && !qrCodeResult && (
        <>
          <QrReader
            scanDelay={1000}
            constraints={{ facingMode: "environment" }}
            onResult={onReadResult}
            style={{ width: "100%" }}
          />
        </>
      )}
      <p>{qrCodeResult}</p>
      <button
        onClick={() => {
          window.location.href = "/storeManage/qrCodeResult";
        }}
      >
        결과 확인{" "}
      </button>
    </Layout>
  );
}
