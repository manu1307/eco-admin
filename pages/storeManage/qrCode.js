import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { QrCodeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";
import {
	apiBaseAddressState,
	storeListState,
} from "../../states/global/globalState";
import axios from "axios";

export default function QrCode() {
	const BASEURL = useRecoilValue(apiBaseAddressState);

	const [data, setData] = useState("");
	const [totalCoffeeCount, setTotalCoffeeCount] = useState("");
	const [tumblerCount, setTumblerCount] = useState("");

	const [qrCodeResult, setQrCodeResult] = useRecoilState(QrCodeReaderState);

	const storeData = useRecoilValue(storeListState);
	const testStore = storeData[0];
	console.log(testStore);

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

	const submitOrder = () => {
		const token = localStorage.getItem("token");

		const data = {
			// storeId: 1,
			// loginId: qrCodeResult,
			// price: 5000,
			// totalCoffeeCount: 3,
			// tumblerCount: 3,
			storeId: testStore.storeId,
			loginId: qrCodeResult,
			price: 5000,
			totalCoffeeCount: parseInt(totalCoffeeCount),
			tumblerCount: parseInt(tumblerCount),
			// couponIds: [1, 2],
		};
		console.log(data);
		axios({
			method: "post",
			url: `${BASEURL}/api/v1/orders`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: data,
		}).then((res) => {
			console.log(res);
		});
	};

	return (
		<Layout
			sideItems={[
				{ text: "매장 관리", url: "/storeManage" },
				{ text: "QR 태그", url: "/storeManage/qrCode" },
			]}>
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
			{qrCodeResult && (
				<>
					<div>
						<label>잔 개수</label>
						<input
							type='number'
							value={totalCoffeeCount}
							onChange={(event) => {
								setTotalCoffeeCount(event.target.value);
							}}
						/>
					</div>
					<div>
						<label>텀블러 개수</label>
						<input
							type='number'
							value={tumblerCount}
							onChange={(event) => {
								setTumblerCount(event.target.value);
							}}
						/>
					</div>

					<button onClick={submitOrder}>확인</button>
				</>
			)}
		</Layout>
	);
}
