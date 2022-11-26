import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Logo from "../../../assets/ecomap-logo.png";
import {
	apiBaseAddressState,
	apiTokenState,
} from "../../../states/global/globalState";
import Drawer from "./Drawer";

const HeaderWrapper = styled.div`
	width: 100%;
	background-color: #072f53;
	position: fixed;
	@media screen and (max-width: 500px) {
		display: none;
	}
`;
const HeaderContent = styled.div`
	/* max-width: 1280px; */
`;
const LogoWrapper = styled.a`
	width: 16.7%;
	max-width: 250px;
	height: 100px;
	background-color: #072f53;
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 500px) {
	}
`;

const NavButtonWrapper = styled.ul`
	display: flex;
	width: 83.3%;
	height: 100px;
	border-collapse: collapse;
	@media screen and (max-width: 500px) {
	}
`;

const NavButton = styled.li`
	width: 15%;
	max-width: 250px;
	height: 100px;
	background-color: #121533;
	text-align: center;
	line-height: 100px;
	font-size: 20px;
	color: white;
	font-weight: 700;
	border-left: 1px solid #072f53;
	cursor: pointer;
	&:hover {
		background-color: #15c0b5;
		color: #072f53;
	}
	@media screen and (max-width: 500px) {
	}
`;

const DropdownWrapper = styled.div`
	width: 40%;
	@media screen and (max-width: 500px) {
	}
`;

const SelectWrapper = styled.select`
	width: 100%;
	height: 100px;
	max-width: 450px;
	background-color: #072f53;
	font-size: 20px;
	color: white;
	font-weight: 700;
	border-color: #072f53;

	&:focus {
		box-sizing: border-box;
		outline: 0;
		border: 0.4px solid #15c0b5;
	}
	@media screen and (max-width: 500px) {
	}
`;
const SelectOption = styled.option`
	padding: 5px 10px;
	background-color: #072f53;
	color: white;
	font-weight: 700;
`;

const MobileWrapper = styled.div`
	width: 100%;
	background-color: #072f53;
	height: 50px;
	display: none;

	@media screen and (max-width: 500px) {
		display: block;
	}
`;

export default function Header() {
	const [storeList, setStoreList] = useState([]);
	const BaseURL = useRecoilValue(apiBaseAddressState);

	// useEffect(() => {
	//   const token = localStorage.getItem("token");
	//   axios({
	//     method: "get",
	//     url: `${BaseURL}/api/v1/stores`,
	//     headers: {
	//       "Content-Type": "application/json",
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }).then((res) => {
	//     console.log(res);
	//   });
	// }, [BaseURL]);

	return (
		<>
			<HeaderWrapper>
				<HeaderContent className='w-full flex flex-wrap justify-left items-center mx-auto'>
					<LogoWrapper href='./dashboard' className='flex items-center'>
						<Image
							style={{ marginTop: "10px" }}
							src={Logo}
							alt='Ecomap Logo'
							priority
						/>
					</LogoWrapper>
					<NavButtonWrapper>
						<Link href='/dashboard'>
							<NavButton>대시보드</NavButton>
						</Link>
						<Link href='/storeSetting'>
							<NavButton>매장 설정</NavButton>
						</Link>
						<Link href='/storeManage'>
							<NavButton>매장 관리</NavButton>
						</Link>
						<Link href='/service-setting'>
							<NavButton>서비스 설정</NavButton>
						</Link>
						<Link href='/payback'>
							<NavButton>정산</NavButton>
						</Link>
						<DropdownWrapper>
							<SelectWrapper>
								{storeList.length > 0 ? (
									storeList.map((store, index) => {
										return <SelectOption key={index}>{store}</SelectOption>;
									})
								) : (
									<SelectOption>가게를 등록해주세요.</SelectOption>
								)}
							</SelectWrapper>
						</DropdownWrapper>
					</NavButtonWrapper>
				</HeaderContent>
			</HeaderWrapper>
			<MobileWrapper>
				<Drawer />
			</MobileWrapper>
		</>
	);
}
