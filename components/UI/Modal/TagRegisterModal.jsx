import styled from "styled-components";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
	apiBaseAddressState,
	apiTokenState,
} from "../../../states/global/globalState";
import axios from "axios";

const TagRegisterModalWrapper = styled.div``;
const TagRegisterModalBackground = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
`;
const TagRegisterModalContainer = styled.div`
	padding: 20px;
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
		left: 0%;
		height: 500px;
		margin: 0 auto;
		overflow-y: scroll;
	}
`;
const TagInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

export default function TagRegisterModal(props) {
	const { changeOpen } = props;

	const [tagItem, setTagItem] = useState("");
	const [tagType, setTagType] = useState("");

	const BASEURL = useRecoilValue(apiBaseAddressState);

	const submitTag = () => {
		if (tagItem && tagType) {
			const token = localStorage.getItem("token");
			const tagData = {
				type: tagType,
				name: tagItem,
			};
			console.log(tagData);
			axios({
				method: "post",
				url: `${BASEURL}/api/v1/tags`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: tagData,
			}).then((res) => {
				if (res.status === 200) {
					changeOpen(false);
				}
			});
		} else {
			alert("올바른 태그를 입력해주세요");
		}
	};

	return (
		<TagRegisterModalWrapper>
			<TagRegisterModalContainer>
				<div className='flex  sm:flex-row gap-4 '>
					<TagInputContainer>
						<select
							className='rounded-xl mr-5'
							defaultValue='none'
							onChange={(event) => {
								console.log(event.target.value);
								setTagType(event.target.value);
							}}>
							<option value='none'>태그 종류</option>
							<option value='menu'>메뉴</option>
							<option value='store'>매장</option>
						</select>
						<input
							className='rounded-xl mr-5 w-80'
							type='text'
							value={tagItem}
							placeholder='태그를 입력해주세요'
							onChange={(event) => {
								setTagItem(event.target.value);
							}}
						/>
						<button
							type='button'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							onClick={submitTag}>
							태그 등록
						</button>
						<button
							type='button'
							onClick={() => {
								changeOpen(() => {
									return false;
								});
							}}
							className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
							취소
						</button>
					</TagInputContainer>
				</div>
			</TagRegisterModalContainer>
			<TagRegisterModalBackground
				onClick={() => {
					changeOpen(() => {
						return false;
					});
				}}></TagRegisterModalBackground>
		</TagRegisterModalWrapper>
	);
}
