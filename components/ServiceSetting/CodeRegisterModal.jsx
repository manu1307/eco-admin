import axios from "axios";
import { info } from "daisyui/src/colors/colorNames";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	apiBaseAddressState,
	currentStoreState,
} from "../../states/global/globalState";

const CodeRegisterModalWrapper = styled.div``;
const CodeRegisterModalBackground = styled.div`
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
const CodeRegisterModalContainer = styled.div`
	width: 800px;
	/* height: 600px; */
	overflow-y: clip;
	padding: 25px;
	background-color: white;
	color: black;
	border-radius: 20px;
	position: absolute;
	top: 100px;
	left: 200px;
	z-index: 3;
	@media screen and (max-width: 1920px) {
		top: 30px;
	}
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
const CodeRegisterModalItemContainer = styled.div`
	width: 100%;
`;
const CodeRegisterModalItemLabel = styled.label`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
`;
const CodeRegisterModalItemInput = styled.input`
	border: 2px solid #00000038;
	@media screen and (max-width: 640px) {
		font-size: 10px;
	}
`;

const CodeRegisterModalItem = (props) => {
	const { label, type, placeholder, onChange } = props;

	return (
		<CodeRegisterModalItemContainer className='flex flex-col gap-2 items-center mt-3'>
			<CodeRegisterModalItemLabel className='w-full text-sm'>
				{label}
			</CodeRegisterModalItemLabel>
			<CodeRegisterModalItemInput
				type={type}
				placeholder={placeholder}
				className='input-bordered rounded-xl w-full max-w-lg font-normal'
				onChange={onChange}
			/>
		</CodeRegisterModalItemContainer>
	);
};

export default function CodeRegisterModal({ open, changeOpen }) {
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const [codeName, setCodeName] = useState("");
	const [codeGroup, setCodeGroup] = useState("");
	const [codeDescription, setCodeDescription] = useState("");

	const registerCode = () => {
		const token = localStorage.getItem("token");
		const data = {
			name: codeName,
			desc: codeDescription,
			group: codeGroup,
		};
		axios({
			method: "post",
			url: `${BASEURL}/api/v1/codes`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: data,
		}).then((res) => {
			if (res.data.success === true) {
				clearModal();
				changeOpen(() => {
					return false;
				});
			}
			console.log(res.data);
		});
	};

	const clearModal = () => {
		setCodeName("");
		setCodeGroup("");
		setCodeDescription("");
	};

	return (
		<CodeRegisterModalWrapper className={!open && "hidden"}>
			<CodeRegisterModalContainer>
				<div className='flex flex-col gap-5 w-full mb-5 sm:w-2/5'>
					<CodeRegisterModalItem
						label='코드 이름'
						type='text'
						placeholder='ex) 카페'
						onChange={(event) => {
							setCodeName(event.target.value);
						}}
					/>
					<CodeRegisterModalItem
						label='코드 설명'
						type='text'
						placeholder='ex) 업체 카테고리 : 카페 '
						onChange={(event) => {
							setCodeDescription(event.target.value);
						}}
					/>
					<CodeRegisterModalItem
						label='코드 그룹'
						type='text'
						placeholder='ex) SHC'
						onChange={(event) => {
							setCodeGroup(event.target.value);
						}}
					/>
				</div>
				<div className='w-full flex'>
					<button
						type='button'
						onClick={registerCode}
						className='w-1/2 text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						등록
					</button>
					<button
						type='button'
						onClick={() => {
							clearModal();
							changeOpen(() => {
								return false;
							});
						}}
						className='w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						취소
					</button>
				</div>
			</CodeRegisterModalContainer>
			<CodeRegisterModalBackground
				onClick={() => {
					clearModal();
					changeOpen(() => {
						return false;
					});
				}}
			/>
		</CodeRegisterModalWrapper>
	);
}
