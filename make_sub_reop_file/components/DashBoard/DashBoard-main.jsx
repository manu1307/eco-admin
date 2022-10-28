import Link from "next/link";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import Arrow from "../../assets/arrow-dashboard.svg";
// import isFirstState from "../../states/DashBoard/DashBoardState";
import Box from "./Box";

const DashBoardWrapper = styled.div`
	padding-top: 20px;
	width: 100%;
	background-color: #f6f6f6;
	padding-left: 50px;
`;

const DashBoardHeader = styled.div`
	width: 100%;
	max-width: 1280px;
	padding: 15px 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
`;
const StoreNameWrapper = styled.div`
	width: 900px;
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
`;
const StoreName = styled.div`
	width: 190px;
	margin-left: 15px;
	font-size: 24px;
	font-weight: bold;
`;
const ModalWrapper = styled.div`
	background-color: #000;
	width: 100%;
	max-width: 1280px;
	height: 600px;
	border-radius: 30px;
	position: absolute;
	margin-top: 20px;
	opacity: 0.8;
	z-index: 2;
	text-align: center;
`;
const ModalMessage = styled.div`
	color: #fff;
	font-weight: bold;
	font-size: ${(props) => props.fontSize}px;
	opacity: 1;
	position: relative;
	top: 100px;
	background-color: #000;
`;
const ModalButton = styled.a`
	opacity: 1;
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
	opacity: ${(props) => (props.isFirst ? 0.5 : 1)};
	width: 100%;
	max-width: 1280px;
`;

export default function DashBoardMain() {
	// console.log(isFirstState);
	const [isFirst, setIsFirst] = useState(true);

	const confirmSetting = () => {
		setIsFirst(false);
	};

	const data = isFirst ? "" : "300";

	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getUTCDate();
	return (
		<DashBoardWrapper className='flex flex-col items-left'>
			<DashBoardHeader className='flex drop-shadow-lg'>
				<div style={{ width: "87%", fontSize: "20px" }}>
					<div className='flex font-bold items-center'>
						<span className='w-5'>
							<Arrow />
						</span>
						오늘의 대시보드
					</div>
					<div className='text-xs ml-5'>{`${year}-${month}-${day}`}</div>
				</div>
				<div className='flex items-center'>사장님 이름 (logo)</div>
			</DashBoardHeader>
			<StoreNameWrapper>
				<div className='flex' style={{ width: "310px" }}>
					<EcoLevel>
						<span style={{ fontSize: "12px" }}>에코레벨</span>
						<span
							className='font-bold'
							style={{ marginLeft: "0.3rem", fontSize: "14px" }}>
							D
						</span>
					</EcoLevel>
					<StoreName>프랜치 갬성 카페</StoreName>
				</div>
			</StoreNameWrapper>
			<div>
				{isFirst && (
					<ModalWrapper>
						<ModalMessage fontSize={50}>환영합니다.</ModalMessage>
						<ModalMessage fontSize={30}>매장설정을 먼저 해주세요.</ModalMessage>
						<ModalButton onClick={confirmSetting}>매장 설정 가기</ModalButton>
					</ModalWrapper>
				)}
				<BoxWrapper className='flex gap-x-5 justify-center mt-5'>
					<Box title='텀블러 적립금' data={data} unit='원' />
					<Box title='텀블러 적립금' data={data} unit='원' />
					<Box title='텀블러 적립금' data={data} unit='원' />
					<Box title='텀블러 적립금' data={data} unit='원' />
				</BoxWrapper>
				<BoxWrapper className='flex gap-x-5 justify-center mt-5'>
					<Box title='텀블러 적립금' data={data} unit='원' />
					<Box title='텀블러 적립금' data={data} unit='원' />
					<Box title='텀블러 적립금' data={data} unit='원' />
					<Box title='텀블러 적립금' data={data} unit='원' />
				</BoxWrapper>
			</div>
			<br />
			<div>차트</div>
		</DashBoardWrapper>
	);
}
