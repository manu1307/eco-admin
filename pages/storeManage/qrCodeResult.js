import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { QrCodeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";

export default function QrCodeResult() {
  const [data, setData] = useState("");

  const qrCodeResult = useRecoilValue(QrCodeReaderState);

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
