import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import BackgroundColor from "../../components/UI/Layout/BackgroundColor";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { SideBarOpenState } from "../../states/ServiceSetting/SideBarOpenState";
import { useState } from "react";
import { QrCodeReaderState } from "../../states/ServiceSetting/QrCodeReaderState";

const ContentSettingWrapper = styled.div`
	padding-top: 20px;
	width: 83.7%;
	background-color: #f6f6f6;
	padding-left: 50px;
	@media screen and (max-width: 640px) {
		width: 100%;
		padding: 10px;
		height: 90vh;
	}
	@media screen and (max-width: 1366px) {
	}
`;

const ContentSettingBody = styled.div`
	width: 100%;
	max-width: 1280px;
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
const CategoryButtonWrapper = styled.div`
	max-width: 1280px;
`;
const CategoryButton = styled.button`
	width: 20%;
	height: 55px;
	line-height: 55px;
	background-color: #121533;
	color: white;
	text-align: center;
	font-size: 20px;
	font-weight: bold;
	cursor: pointer;
	:hover {
		background-color: #00e1d4;
		color: #121533;
	}
`;
const SearchInputStyled = styled.input`
	border: 1px solid black;
	border-radius: 20px;
	font-size: 12px;
	height: 40px;
`;

const SearchInput = (props) => {
	const { type, placeholder } = props;
	return <SearchInputStyled type={type} placeholder={placeholder} />;
};

export default function StoreManage() {
	const [sideBarOpen, setSideBarOpenState] = useRecoilState(SideBarOpenState);

	const [currentCategory, setCurrentCategory] = useState("단골관리");
	return (
		<Layout
			sideItems={[
				{ text: "매장 관리", url: "/storeManage" },
				{ text: "QR 태그", url: "/storeManage/qrCode" },
			]}>
			<ContentSettingWrapper className={sideBarOpen ? "z-0" : "z-10"}>
				<ContentHeader
					firstCategory='매장 관리'
					secondCategory={currentCategory}
				/>
				<CategoryButtonWrapper className='flex gap-2 w-full mt-5'>
					<CategoryButton
						onClick={() => {
							setCurrentCategory("단골 관리");
						}}>
						단골
					</CategoryButton>
					<CategoryButton
						onClick={() => {
							setCurrentCategory("주문 관리");
						}}>
						주문
					</CategoryButton>
					<CategoryButton
						onClick={() => {
							setCurrentCategory("스탬프 관리");
						}}>
						스탬프
					</CategoryButton>
					<CategoryButton
						onClick={() => {
							setCurrentCategory("포인트 관리");
						}}>
						포인트
					</CategoryButton>
					<CategoryButton
						onClick={() => {
							setCurrentCategory("쿠폰 관리");
						}}>
						쿠폰
					</CategoryButton>
				</CategoryButtonWrapper>
				<ContentSettingBody className='flex flex-col items-center'>
					<div className='flex'>
						<div>
							<div>고객명</div>
							<SearchInput type='text' placeholder='이름을 입력하세요' />
						</div>
					</div>
					<ContentSettingBodyHeader className='flex items-center'></ContentSettingBodyHeader>
				</ContentSettingBody>
			</ContentSettingWrapper>
			<BackgroundColor />
		</Layout>
	);
}
