import Layout from "../components/UI/Layout/Layout";
// import { useHtml5QrCodeScanner } from "react-html5-qrcode-reader";
// import Html5QrcodePlugin from "../components/Html5QrcodePlugin";

import { useState, useEffect } from "react";

export default function DashBoard() {
	const [data, setData] = useState("No result");

	// constructor(props) {
	//     super(props);

	//     // This binding is necessary to make `this` work in the callback.
	//     this.onNewScanResult = this.onNewScanResult.bind(this);
	// }

	// onNewScanResult(decodedText, decodedResult) {
	//     // Handle the result here.
	// }

	return (
		<Layout
			sideItems={[
				{ text: "통계", url: "/dashboard" },
				{ text: "QR", url: "/dashboard-qrcode" },
			]}>
			{" "}
			{/* (
			<div>
				<h1>Html5Qrcode React example!</h1>
				<Html5QrcodePlugin
					fps={10}
					qrbox={250}
					disableFlip={false}
					qrCodeSuccessCallback={this.onNewScanResult}
				/>
			</div>
			); */}
		</Layout>
	);
}
