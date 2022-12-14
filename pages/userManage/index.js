import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { SideBarOpenState } from "../../states/ServiceSetting/SideBarOpenState";
import { useState } from "react";
import {
	apiBaseAddressState,
	currentShopState,
} from "../../states/global/globalState";
import axios from "axios";

const ContentSettingWrapper = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 28px;
	box-sizing: content-box;
	background-color: #f6f6f6;
	@media screen and (max-width: 640px) {
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
	}
	@media screen and (max-width: 1366px) {
	}
`;

const ContentSettingBody = styled.div`
	width: 100%;
	max-width: 1140px;
	height: 90%;
	max-height: 900px;
	margin-top: 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
	padding: 20px 20px;
`;

const ContentSettingBodyHeader = styled.div`
	width: 100%;
	border-radius: 15px;
	background-color: #242746;
	height: 70px;
	color: white;
	font-size: 20px;
	font-weight: 700;
	@media screen and (max-width: 640px) {
		font-size: 12px;
		height: 50px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const ContentSettingBodyContent = styled.div`
	width: 100%;
	border-radius: 15px;
	background-color: #f5f5f5;
	height: 70px;
	color: black;
	font-size: 20px;
	font-weight: 700;
	display: flex;
	align-items: center;
	@media screen and (max-width: 640px) {
		font-size: 12px;
		height: 50px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;
const SearchButton = styled.button`
	background-color: #242746;
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
`;
const SearchInputStyled = styled.input`
	border: 2px solid lightgrey;
	border-radius: 20px;
	font-size: 12px;
	height: 40px;
	width: 100%;
`;

const SearchInput = (props) => {
	const { type, placeholder } = props;
	return <SearchInputStyled type={type} placeholder={placeholder} />;
};

const StoreManageHeader = {
	frequent: ["?????????", "?????? ?????? ??????", "????????? ?????????", "?????? ?????????"],
	order: [
		"????????????",
		"????????????",
		"?????? ??????",
		"?????????",
		"?????????",
		"?????????",
		"delYn",
	],
	stamp: ["????????? Id", "??????", "Id", "?????? ??????", "?????????", "delYn"],
	point: [
		"????????? Id",
		"??????",
		"?????? ??????",
		"Id",
		"?????????",
		"??????",
		"businessType",
	],
	coupon: [
		"?????? Id",
		"?????? ?????????",
		"?????? ?????????",
		"Id",
		"?????? ??????",
		"?????? ??????",
		"?????? ??????",
	],
};

export default function UserAdmin() {
	const [sideBarOpen, setSideBarOpenState] = useRecoilState(SideBarOpenState);
	const currentShop = useRecoilValue(currentShopState);
	const BASEURL = useRecoilValue(apiBaseAddressState);

	const [currentCategory, setCurrentCategory] = useState("frequent");

	const getOrder = () => {
		const storeId = currentShop[0].storeId;
		const token = localStorage.getItem("token");

		axios({
			method: "get",
			url: `${BASEURL}/api/v1/orders/owner/${storeId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			console.log(res.data);
		});
	};
	return (
		<Layout
			sideItems={[
				{ text: "?????? ??????", url: "/userManage" },
				{ text: "?????????", url: "/userManage/admin" },
			]}>
			<ContentSettingWrapper className={sideBarOpen ? "z-0" : "z-10"}>
				<ContentHeader firstCategory='?????? ??????' />

				<ContentSettingBody className='flex flex-col items-center'>
					<div className='w-full sm:flex justify-around hidden'>
						<div className='w-11/12 flex justify-between mb-3'>
							<div className='w-1/5'>
								<div className='text-sm mb-1'>Customer</div>
								<SearchInput type='text' placeholder='Enter Customer Name' />
							</div>
							<div className='w-1/5'>
								<div className='text-sm mb-1'>Id</div>
								<SearchInput type='text' placeholder='Enter Your Id' />
							</div>
							<div className='w-1/5'>
								<div className='text-sm mb-1'>Start Date</div>
								<SearchInput type='text' placeholder='Start Date' />
							</div>
							<div className='w-1/5'>
								<div className='text-sm mb-1'>End Date</div>
								<SearchInput type='text' placeholder='End Date' />
							</div>
						</div>
						<div className='flex items-center '>
							<SearchButton>??????</SearchButton>
						</div>
					</div>
					<ContentSettingBodyHeader className='flex items-center justify-around'>
						<div className='w-8 sm:w-32 text-center'>Check</div>
						{StoreManageHeader[currentCategory].map((item, i) => {
							return <div key={i}>{item}</div>;
						})}
						{/* <div>????????? ID</div>
						<div>Date</div>
						<div>Id</div>
						<div>????????? ?????????</div>
						<div>?????? ?????????</div> */}
					</ContentSettingBodyHeader>
					<ContentSettingBodyContent className='flex items-center justify-around'>
						<div className='w-8 sm:w-32 text-center'>
							<input type='checkbox' />
						</div>
						{StoreManageHeader[currentCategory].map((item, i) => {
							return <div key={i}>{item}</div>;
						})}
						{/* <div>??????</div>
						<div>??????</div>
						<div>Id</div>
						<div>20???</div>
						<div>3???</div> */}
					</ContentSettingBodyContent>
				</ContentSettingBody>
			</ContentSettingWrapper>
		</Layout>
	);
}
