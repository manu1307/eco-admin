import Layout from "../components/UI/Layout/Layout";

import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function DashBoard() {
	const [data, setData] = useState("No result");
	return (
		<Layout
			sideItems={[
				{ text: "통계", url: "/dashboard" },
				{ text: "QR", url: "/dashboard-qrcode" },
			]}>
			<QrReader
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						console.info(error);
					}
				}}
				style={{ width: "100%" }}
			/>
			<p>{data}</p>
		</Layout>
	);
}
