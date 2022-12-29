import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { SideBarOpenState } from "../../states/ServiceSetting/SideBarOpenState";
import { useEffect, useState } from "react";
import {
	apiBaseAddressState,
	currentShopState,
	loginRoleState,
} from "../../states/global/globalState";
import NormalInput from "../../components/UI/Input/NormalInput";
import GenderInput from "../../components/UI/Input/GenderInput";

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
const AdminRegisterUserModalWrapper = styled.div``;
const AdminRegisterUserModalBackground = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;

	@media screen and (max-width: 640px) {
		width: 100vw;
	}
`;
const AdminRegisterUserModalContainer = styled.div`
	width: 800px;
	overflow-y: clip;
	padding: 25px;
	background-color: white;
	color: black;
	border-radius: 20px;
	position: absolute;
	top: 100px;
	left: 200px;
	z-index: 3;
	@media screen and (max-width: 1140px) {
		height: 90vh;
	}
	@media screen and (max-width: 640px) {
		width: 90%;
		top: 20px;
		left: 5%;
		position: absolute;
		padding: 15px;
		height: 700px;
		margin: 0 auto;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
	}
`;

const AuthButton = styled.button`
	border: 1px solid #00aea4;
	width: 120px;
	padding: 10px 10px;
	margin-left: 40px;
	border-radius: 10px;
	color: #00aea4;
	font-weight: bold;
	&:hover {
		transition: all 0.2s ease-in-out;
		background-color: #00aea4;
		color: white;
	}
	@media screen and (max-width: 640px) {
		width: 80px;
		font-size: 12px;
		padding: 5px 10px;
		margin-left: 0px;
	}
`;
const SubmitButton = styled.a`
	border: 1px solid #00aea4;
	width: 200px;
	height: 50px;
	padding: 10px 20px;
	border-radius: 10px;
	color: #00aea4;
	font-weight: bold;
	font-size: 20px;
	cursor: pointer;
	&:hover {
		transition: all 0.2s ease-in-out;
		background-color: #00aea4;
		color: white;
	}
	@media screen and (max-width: 640px) {
		width: 150px;
		font-size: 18px;
		padding: 10px 20px;
		margin-left: 0px;
		margin-bottom: 20px;
	}
`;

const FormItemLayout = (props) => {
	const { label, input, button } = props;
	return (
		<div className=' w-full md:flex gap-5 items-center mt-3'>
			<div id='label' className='text-w-full text-black text-left w-full'>
				{label}
				<sup style={{ color: "red" }}>*</sup>
			</div>
			<div className='text-black'>{input}</div>
			<div className='w-full text-left'>{button && button}</div>
		</div>
	);
};

export default function UserAdmin() {
	const [sideBarOpen, setSideBarOpenState] = useRecoilState(SideBarOpenState);
	const currentShop = useRecoilValue(currentShopState);
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [loginRole, setLoginRole] = useRecoilState(loginRoleState);

	useEffect(() => {
		const role = localStorage.getItem("role");
		setLoginRole(role);
	}, [setLoginRole]);

	const signUpPost = async (event) => {
		event.preventDefault();

		axios({
			method: "post",
			url: `${BASEURL}/api/v1/members/signup`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify({
				loginId: id,
				password: password,
				confirmPassword: passwordConfirm,
				name: name,
				phoneNumber: phoneNumber,
				birthday: birthday,
				gender: gender,
			}),
		}).then((response) => {
			console.log(response);
			if (response.status < 300) {
				window.location.href = "/";
			} else {
				alert("입력을 확인해주세요");
			}
		});
	};
	const isOpen = () => {
		setModalIsOpen((prev) => !prev);
	};

	const sideItems = [
		{ text: "회원 관리", url: "/userManage" },
		loginRole === "admin" ? { text: "관리자", url: "/userManage/admin" } : [],
	];
	return (
		<Layout sideItems={sideItems}>
			<ContentSettingWrapper className={sideBarOpen ? "z-0" : "z-10"}>
				<ContentHeader firstCategory='회원 관리' secondCategory='관리자' />
				<button
					className='mt-5 w-full sm:w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 '
					onClick={isOpen}>
					관리자 회원 등록
				</button>
				{modalIsOpen && (
					<AdminRegisterUserModalWrapper>
						<AdminRegisterUserModalContainer className='overflow-visible'>
							<form
								className='w-5/6 lg:w-full flex flex-col text-center mx-auto'
								onSubmit={(event) => {
									event.preventDefault();
								}}>
								<FormItemLayout
									label='아이디'
									input={
										<NormalInput
											placeholder='아이디를 입력하세요'
											type='text'
											onChange={(event) => {
												console.log(event.target.value);
											}}
											name='id'
											required
										/>
									}></FormItemLayout>

								<FormItemLayout
									label='이름'
									input={
										<NormalInput
											placeholder='이름을 입력해주세요'
											type='text'
											name='name'
										/>
									}></FormItemLayout>
								<FormItemLayout
									label='전화번호'
									input={
										<NormalInput
											placeholder='숫자만 입력해주세요'
											type='tel'
											name='phoneNumber'
										/>
									}></FormItemLayout>
								<FormItemLayout
									label='생년월일'
									input={
										<NormalInput type='date' name='birthday' />
									}></FormItemLayout>
								<FormItemLayout
									label='성별'
									input={<GenderInput />}></FormItemLayout>
								<div className='w-full flex gap-5 justify-center text-center mt-10'>
									<SubmitButton onClick={isOpen}>취소</SubmitButton>
									<SubmitButton onClick={signUpPost}>추가</SubmitButton>
								</div>
							</form>
						</AdminRegisterUserModalContainer>
						<AdminRegisterUserModalBackground
							onClick={() => {
								isOpen();
							}}
						/>
					</AdminRegisterUserModalWrapper>
				)}
			</ContentSettingWrapper>
		</Layout>
	);
}
