import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const TagEditModalWrapper = styled.div``;
const TagEditModalBackground = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
`;
const TagEditModalContainer = styled.div`
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
	return (
		<TagEditModalWrapper>
			<TagEditModalContainer>
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
							// onClick={submitTagItem}
						>
							태그 등록
						</button>
						<button
							type='button'
							// onClick={EditMenu}
							className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
							취소
						</button>
					</TagInputContainer>
				</div>
			</TagEditModalContainer>
			<TagEditModalBackground
				onClick={() => {
					changeOpen(() => {
						return false;
					});
				}}></TagEditModalBackground>
		</TagEditModalWrapper>
	);
}
