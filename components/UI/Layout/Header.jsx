import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Logo from "../../../assets/ecomap-logo.png";
import {
	apiBaseAddressState,
	apiTokenState,
	currentShopState,
	shopListState,
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
const LogoutButton = styled.li`
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	font-size: 14px;
	color: white;
	font-weight: 700;
	border-left: 1px solid #072f53;
	cursor: pointer;
`;

const DropdownWrapper = styled.div`
	width: 40%;
	max-width: 450px;
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
	// console.log("header 먼저");
	const [shopList, setShopList] = useRecoilState(shopListState);
	const [currentShop, setCurrentShop] = useRecoilState(currentShopState);
	const BASEURL = useRecoilValue(apiBaseAddressState);

	useEffect(() => {
		const token = localStorage.getItem("token");
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
					// console.log("no current Store");
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
	// console.log(shopList.length);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("shopId");
		window.location.href = "/";
	};

	return (
		<>
			<HeaderWrapper>
				<HeaderContent className='w-full flex flex-wrap justify-left items-center mx-auto'>
					<LogoWrapper href='/dashboard' className='flex items-center'>
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
						<Link href='/shopSetting'>
							<NavButton>매장 설정</NavButton>
						</Link>
						<Link href='/shopManage'>
							<NavButton>매장 관리</NavButton>
						</Link>
						<Link href='/serviceSetting'>
							<NavButton>서비스 설정</NavButton>
						</Link>
						<Link href='/userManage'>
							<NavButton>회원 관리</NavButton>
						</Link>

						<DropdownWrapper>
							<SelectWrapper
								onChange={(event) => {
									const selectedShop = shopList.filter(
										(shop) => shop.name == event.target.value
									);
									setCurrentShop(selectedShop[0]);
									localStorage.setItem("shopId", selectedShop[0].shopId);
								}}
								value={currentShop.name}>
								{shopList.length > 0 ? (
									shopList.map((shop, index) => {
										const selected = currentShop.name === shop.name;
										return (
											<SelectOption key={index} selected={selected}>
												{shop.name}
											</SelectOption>
										);
									})
								) : (
									<SelectOption>가게를 등록해주세요.</SelectOption>
								)}
							</SelectWrapper>
						</DropdownWrapper>
						<LogoutButton onClick={logout}>로그아웃</LogoutButton>
					</NavButtonWrapper>
				</HeaderContent>
			</HeaderWrapper>
			<MobileWrapper>
				<Drawer />
			</MobileWrapper>
		</>
	);
}
