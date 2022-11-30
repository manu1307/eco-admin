import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { QrCOdeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";

export default function QrCodeResult() {
  const [shouldRender, setShouldRender] = useState(false);
  const [data, setData] = useState("");

  const [qrCodeResult, setQrCodeResult] = useRecoilState(QrCOdeReaderState);

  console.log(qrCodeResult);

  return (
    <Layout
      sideItems={[
        { text: "매장 관리", url: "/storeManage" },
        { text: "QR 태그", url: "/storeManage/qrCode" },
      ]}
    >
      <div>{qrCodeResult}</div>
    </Layout>
  );
}
