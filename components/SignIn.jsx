import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	width: 900px;
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
	&:hover {
		background-color: #168ff9;
	}
`;
export default function SignIn() {
	const [loginId, setLoginId] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	let loginToken = "1234";

	const onChangeLoginId = (event) => {
		setLoginId(() => event.target.value);
		console.log(loginId);
	};
	const onChangeLoginPassword = (event) => {
		setLoginPassword(() => event.target.value);
		console.log(loginPassword);
	};

	const Login = async () => {
		// axios({
		// 	method: "post",
		// 	url: "http://43.200.176.153:8080/api/v1/members/login",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	data: JSON.stringify({
		// 		loginId: loginId,
		// 		password: loginPassword,
		// 	}),
		// }).then((response) => console.log(response.data.token));

		if (loginToken) {
			window.location.href = "/dashboard";
		} else {
			console.log("fail login");
		}
	};
	const SignUp = () => {
		window.location.href = "/signup";
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
				<div className='flex text-xs mt-1 justify-around text-gray-400 '>
					<div>
						<FindButton>아이디 찾기</FindButton>
					</div>
					<div>
						<FindButton>비밀번호 찾기</FindButton>
					</div>
				</div>
				<div className='w-full flex justify-center my-4 '>
					<LoginButton
						className='px-4 py-2 rounded-lg text-white text-lg'
						onClick={Login}>
						로그인
					</LoginButton>
					<Link href='/signup'>
						<LoginButton
							className='px-4 py-2 rounded-lg text-white text-lg'
							onClick={SignUp}>
							회원가입
						</LoginButton>
					</Link>
				</div>
			</form>
		</Wrapper>
	);
}
