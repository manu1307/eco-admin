import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";

const Test = (props) => {
  const [data, setData] = useState("");
  const lastResult = useRef();

  const onReadResult = (result, error) => {
    if (!result) {
      return;
    }

    lastResult.current = result.text;
    if (!!error) {
      console.info(error);
    }
  };

  return (
    <>
      {!lastResult.current && (
        <QrReader
          scanDelay={1000}
          constraints={{ facingMode: "environment" }}
          onResult={onReadResult}
          style={{ width: "100%" }}
        />
      )}
      <p>{lastResult.current}</p>
    </>
  );
};
export default function StoreManage() {
  const [shouldRender, setShouldRender] = useState(false);

  return (
    <Layout
      sideItems={[
        { text: "매장 관리", url: "/storeManage" },
        { text: "QR 태그", url: "/storeManage/qrCode" },
      ]}
    >
      {shouldRender && <Test />}
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
