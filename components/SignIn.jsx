import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	apiBaseAddressState,
	apiTokenState,
	loginRoleState,
	storeListState,
} from "../states/global/globalState";

const Wrapper = styled.div`
	width: 900px;
	@media screen and (max-width: 640px) {
		width: 100%;
	}
`;
const InputID = styled.input`
	font-size: 15px;
	width: 300px;
	border: 0.3px solid gray;
	padding: 10px 20px;
	border-collapse: collapse;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	box-sizing: border-box;
	color: black;

	&:focus {
		outline: none;
		border: 2px solid black;
	}
`;
const InputPW = styled.input`
	font-size: 15px;
	width: 300px;
	border: 0.3px solid gray;
	border-top: 0;
	padding: 10px 20px;
	border-collapse: collapse;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	box-sizing: border-box;
	color: black;

	&:focus {
		outline: none;
		border: 2px solid black;
	}
`;

const FindButton = styled.button`
	color: #6f6f6f;
	&:hover {
		color: black;
	}
`;

const LoginButton = styled.a`
	background-color: #369efa;
	cursor: pointer;
	-webkit-text-fill-color: rgb(255, 255, 255);
	&:hover {
		background-color: #168ff9;
	}
`;
export default function SignIn() {
	const [loginId, setLoginId] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const loginToken = useRef("");
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const [globalLoginToken, setGlobalLoginToken] = useRecoilState(apiTokenState);
	const [loginRole, setLoginRole] = useRecoilState(loginRoleState);

	const onChangeLoginId = (event) => {
		setLoginId(() => event.target.value);
	};
	const onChangeLoginPassword = (event) => {
		setLoginPassword(() => event.target.value);
	};

	const Login = async () => {
		axios({
			method: "post",
			url: `${BASEURL}/api/v1/members/login`,
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				loginId: loginId,
				password: loginPassword,
			}),
		}).then((response) => {
			// console.log(response.data);
			if (response.data.statusCode < 300 && response.data.success === true) {
				loginToken.current = response.data.data.token;
				localStorage.setItem("role", response.data.data.role);
				if (loginToken) {
					setGlobalLoginToken(loginToken.current);
					localStorage.setItem("token", loginToken.current);
					window.location.href = "/dashboard";
					setLoginRole(localStorage.getItem("role"));
				}
			} else {
				alert("아이디, 비밀번호를 다시 확인해주세요.");
				return;
			}
		});
	};

	return (
		<Wrapper className='flex flex-col justify-center items-center'>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					console.log("submitted");
				}}>
				<div>
					<InputID
						type='text'
						value={loginId}
						onChange={onChangeLoginId}
						placeholder='아이디'
					/>
				</div>
				<div>
					<InputPW
						placeholder='비밀번호'
						type='password'
						value={loginPassword}
						onChange={onChangeLoginPassword}
					/>
				</div>
				<div className='flex text-xs mt-1 justify-around text-gray-400 '></div>
				<div className='w-full flex justify-around my-4 '>
					<LoginButton
						className='px-4 py-2 rounded-lg text-white text-lg'
						onClick={Login}>
						로그인
					</LoginButton>
					<Link href='/signup'>
						<LoginButton className='px-4 py-2 rounded-lg text-white text-lg'>
							회원가입
						</LoginButton>
					</Link>
				</div>
			</form>
		</Wrapper>
	);
}
