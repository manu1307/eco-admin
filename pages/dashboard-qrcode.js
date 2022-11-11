import Layout from "../components/UI/Layout/Layout";

import { useState } from "react";

export default function DashBoard() {
  const [data, setData] = useState("No result");
  return (
    <Layout
      sideItems={[
        { text: "통계", url: "/dashboard" },
        { text: "QR", url: "/dashboard-qrcode" },
      ]}
    ></Layout>
  );
}
