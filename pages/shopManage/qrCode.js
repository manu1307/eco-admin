import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { QrCodeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";
import {
	apiBaseAddressState,
	shopListState,
	storeListState,
} from "../../states/global/globalState";
import axios from "axios";

const QRCodeWrapper = styled.div`
	@media screen and (max-width: 640px) {
		width: 100%;
		height: 50vh;
		padding: 50px 20px 0;
		align-items: center;
	}
`;
const CountInput = styled.input`
	width: 50%;
	border: 1px solid lightgrey;
	border-radius: 25px;
	padding: 10px 15px;
`;

export default function QrCode() {
	const BASEURL = useRecoilValue(apiBaseAddressState);

	const [data, setData] = useState("");
	const [totalCoffeeCount, setTotalCoffeeCount] = useState("");
	const [tumblerCount, setTumblerCount] = useState("");

	const [qrCodeResult, setQrCodeResult] = useRecoilState(QrCodeReaderState);

	const shopData = useRecoilValue(shopListState);
	const testShop = shopData[0];
	console.log(testShop);

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
			storeId: testShop.storeId,
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
			alert(
				`아이디 : ${qrCodeResult} \n 총 잔개수 : ${totalCoffeeCount} \n 텀블러 : ${tumblerCount}`
			);
			if (res.status < 300) {
				window.location.href = "/shopManage";
			}
		});
	};

	return (
		<Layout
			sideItems={[
				{ text: "매장 관리", url: "/shopManage" },
				{ text: "QR 태그", url: "/shopManage/qrCode" },
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
			{/* <p>{qrCodeResult}</p> */}
			{qrCodeResult && (
				<QRCodeWrapper>
					<div className='text-black flex flex-col gap-8'>
						<div className='flex flex-col gap-4 items-center'>
							<label className='text-center text-2xl font-bold'>잔 개수</label>
							<CountInput
								type='number'
								value={totalCoffeeCount}
								onChange={(event) => {
									setTotalCoffeeCount(event.target.value);
								}}
							/>
						</div>
						<div className='flex flex-col gap-4 items-center'>
							<label className='text-center text-2xl font-bold '>
								텀블러 개수
							</label>
							<CountInput
								type='number'
								value={tumblerCount}
								onChange={(event) => {
									setTumblerCount(event.target.value);
								}}
							/>
						</div>

						<div className='w-full flex justify-center'>
							<button
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								onClick={submitOrder}>
								확인
							</button>
						</div>
					</div>
				</QRCodeWrapper>
			)}
		</Layout>
	);
}
