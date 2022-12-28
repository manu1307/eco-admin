import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const CodeEditModalWrapper = styled.div``;
const CodeEditModalBackground = styled.div`
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
const CodeEditModalContainer = styled.div`
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
const CodeEditModalItemContainer = styled.div`
	width: 100%;
`;
const CodeEditModalItemLabel = styled.label`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
`;
const CodeEditModalItemInput = styled.input`
	border: 2px solid #00000038;
	@media screen and (max-width: 640px) {
		font-size: 10px;
	}
`;

const CodeEditModalItem = (props) => {
	const { label, type, placeholder, onChange } = props;

	return (
		<CodeEditModalItemContainer className='flex flex-col gap-2 items-center mt-3'>
			<CodeEditModalItemLabel className='w-full text-sm'>
				{label}
			</CodeEditModalItemLabel>
			<CodeEditModalItemInput
				type={type}
				placeholder={placeholder}
				className='input-bordered rounded-xl w-full max-w-lg font-normal'
				onChange={onChange}
			/>
		</CodeEditModalItemContainer>
	);
};

export default function CodeEditModal(props) {
	const { open, codeId, data, changeOpen } = props;
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const [codeName, setCodeName] = useState("");
	const [codeGroup, setCodeGroup] = useState("");
	const [codeDescription, setCodeDescription] = useState("");

	const editCode = () => {
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
		<CodeEditModalWrapper className={!open && "hidden"}>
			<CodeEditModalContainer>
				<div className='flex flex-col gap-5 w-full mb-5 sm:w-2/5'>
					<CodeEditModalItem
						label='코드 이름'
						type='text'
						placeholder='ex) 카페'
						onChange={(event) => {
							setCodeName(event.target.value);
						}}
					/>
					<CodeEditModalItem
						label='코드 설명'
						type='text'
						placeholder='ex) 업체 카테고리 : 카페 '
						onChange={(event) => {
							setCodeDescription(event.target.value);
						}}
					/>
					<CodeEditModalItem
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
						onClick={editCode}
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
			</CodeEditModalContainer>
			<CodeEditModalBackground
				onClick={() => {
					clearModal();
					changeOpen(() => {
						return false;
					});
				}}
			/>
		</CodeEditModalWrapper>
	);
}
