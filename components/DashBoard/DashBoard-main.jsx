import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import Arrow from "../../assets/arrow-dashboard.svg";
import Box from "./Box";
import {
	apiBaseAddressState,
	currentShopState,
	currentStoreState,
	shopListState,
	storeListState,
} from "../../states/global/globalState";
import { current } from "daisyui/src/colors";

const DashBoardWrapper = styled.div`
	padding: 28px;
	width: 100%;
	max-width: 1140px;
	box-sizing: content-box;
	background-color: #f6f6f6;
	z-index: 0;
	@media screen and (max-width: 640px) {
		box-sizing: border-box;
		padding: 10px;
		height: 100%;
	}
`;

const DashBoardHeader = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 15px 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
`;
const StoreNameWrapper = styled.div`
	width: 100%;
	max-width: 900px;
	margin-top: 20px;
	height: 40px;
`;
const EcoLevel = styled.div`
	width: 100px;
	height: 40px;
	padding-left: 10px;
	padding-right: 10px;
	background-color: #ffba09;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: black;
`;
const StoreName = styled.div`
	width: 190px;
	margin-left: 15px;
	font-size: 24px;
	font-weight: bold;
	color: black;
	display: flex;
	align-items: center;
`;
const ModalWrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.8);
	width: 92%;
	max-width: 1140px;
	height: 80%;
	max-height: 420px;
	border-radius: 30px;
	position: absolute;
	margin-top: 20px;
	text-align: center;
	@media screen and (max-width: 640px) {
		width: calc(100% - 20px);
		margin: 0 auto;
		margin-top: 20px;
	}
`;
const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const ModalMessage = styled.div`
	color: white;
	font-weight: bold;
	font-size: ${(props) => props.fontSize}px;
	position: relative;
	top: 100px;
`;
const ModalButton = styled.a`
	padding: 16px 20px;
	gap: 10px;
	width: 230px;
	height: 56px;
	background: #00e1d4;
	box-shadow: 1px 1px 2px 1.5px #242746;
	border-radius: 50px;
	position: relative;
	top: 150px;
	font-size: 24px;
	font-weight: bold;
	z-index: 10;
	cursor: pointer;
`;
const BoxWrapper = styled.div`
	/* opacity: ${(props) => (props.isFirst ? 0.3 : 1)}; */
	width: 100%;
	max-width: 1140px;
`;

export default function DashBoardMain() {
	// console.log("???????????? ??????");

	const [shopId, setShopId] = useState();
	const [shopList, setShopList] = useRecoilState(shopListState);
	const [currentShop, setCurrentShop] = useRecoilState(currentShopState);
	const BASEURL = useRecoilValue(apiBaseAddressState);
	console.log(currentShop);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setShopId(localStorage.getItem("shopId"));

		if (!token) {
			alert("???????????? ????????????");
			window.location.href = "/";
		}
		axios({
			method: "get",
			url: `${BASEURL}/api/v1/shops?page=0`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			if (res.data.data.content.length > 0) {
				setShopList(res.data.data.content);

				if (!currentShop.name) {
					// console.log(res.data.data.content[0]);
					setCurrentShop(res.data.data.content[0]);
					localStorage.setItem("shopId", res.data.data.content[0].shopId);
				} else {
					// console.log("there is current Store");
					// console.log(currentShop);
					localStorage.setItem("shopId", currentShop.shopId);
				}
			} else {
				console.log(res.data.data);
			}
		});
	}, [BASEURL, setShopList, currentShop, setCurrentShop]);

	const data = !shopId ? "" : "300";

	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getUTCDate();

	const sentSettingPage = () => {
		window.location.href = "/shopSetting/register";
	};

	return (
		<>
			<DashBoardWrapper className='flex flex-col items-left'>
				<DashBoardHeader className='flex drop-shadow-lg text-black'>
					<div style={{ width: "87%", fontSize: "20px" }}>
						<div className='flex font-bold items-center'>
							<span className='w-5'>
								<Arrow />
							</span>
							????????? ????????????
						</div>
						<div className='text-xs ml-5'>{`${year}-${month}-${day}`}</div>
					</div>
					<div className='flex items-center'>????????? ?????? (logo)</div>
				</DashBoardHeader>
				<StoreNameWrapper>
					<div className='flex' style={{ width: "310px" }}>
						<EcoLevel>
							<span style={{ fontSize: "12px" }}>????????????</span>
							<span
								className='font-bold'
								style={{ marginLeft: "0.3rem", fontSize: "14px" }}>
								D
							</span>
						</EcoLevel>
						<StoreName>
							{currentShop.name ? (
								currentShop.name
							) : (
								<div className='text-sm'>????????? ??????????????????</div>
							)}
						</StoreName>
					</div>
				</StoreNameWrapper>
				<div>
					{!shopId && (
						<div className='flex justify-center'>
							<ModalWrapper>
								<ModalContainer>
									<ModalMessage fontSize={50}>???????????????.</ModalMessage>
									<ModalMessage fontSize={30}>
										??????????????? ?????? ????????????.
									</ModalMessage>
									<Link href='/shopSetting/register'>
										<ModalButton onClick={sentSettingPage}>
											?????? ?????? ??????
										</ModalButton>
									</Link>
								</ModalContainer>
							</ModalWrapper>
						</div>
					)}
					<BoxWrapper className='justify-center mt-5 sm:flex sm:gap-x-5'>
						<div className='w-full sm:inline-block'>
							<Box
								title='????????? ?????????'
								data={currentShop.basePoint}
								unit='P'
							/>{" "}
						</div>
						<div className='w-full  sm:inline'>
							<Box
								title='?????? ?????? ??????'
								data={currentShop.basePrice}
								unit='???'
							/>{" "}
						</div>
						<div className='hidden w-full  sm:inline'>
							<Box title='????????? ??????' data={data} unit='???' />
						</div>
						<div className='hidden w-full  sm:inline'>
							<Box title='?????? ????????? ?????? ??????' data={data} unit='???' />
						</div>
					</BoxWrapper>
					<BoxWrapper className='hidden gap-x-5 justify-center mt-5 sm:flex'>
						<Box title='????????? ?????????' data={data} unit='???' />
						<Box title='????????? ?????????' data={data} unit='???' />
						<Box title='????????? ?????????' data={data} unit='???' />
						<BoxWrapper title='????????? ?????????' data={data} unit='???' />
					</BoxWrapper>
				</div>
				<br />
				{/* <div>??????</div> */}
			</DashBoardWrapper>
		</>
	);
}
