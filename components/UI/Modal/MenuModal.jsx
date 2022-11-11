import styled from "styled-components";
import { useState } from "react";

const ModalWrapper = styled.div`
	/* width: calc(100% - 250px); */
	width: 90vw;
	height: 100vh;
	position: absolute;
	top: 0px;
	background-color: hsla(0, 0%, 86.27450980392157%, 0.7);
	left: 0px;
	padding-top: 10%;
	display: flex;
	justify-content: center;
	@media screen and (max-width: 500px) {
		width: 100%;
		left: 0px;
		top: 50px;
		padding-top: 20px;
	}
`;
const ModalContent = styled.div`
	width: 90%;
	max-width: 800px;
	height: 80%;
	background-color: white;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	padding: 15px 15px;
	@media screen and (max-width: 500px) {
		height: 70%;
	}
`;
const MenuInput = styled.input`
	width: 100%;
	padding: 10px 20px;
	border: 2px solid lightgray;
	border-radius: 5px;
`;

const MenuEditItem = (props) => {
	const { label, inputValue } = props;
	const [inputData, setInputData] = useState(inputValue);
	return (
		<div>
			<div>{label}</div>
			<MenuInput
				value={inputData}
				onChange={(event) => {
					setInputData(event.target.value);
				}}
			/>
		</div>
	);
};

export default function MenuModal(props) {
	const { data, onClick } = props;

	return (
		<ModalWrapper>
			<ModalContent>
				<div className='w-full h-5/6 gap-5 sm:flex sm:h-5/6'>
					<div className='w-4/6 h-2/5 sm:h-full'>
						<div className='border-2 h-4/6 sm:h-5/6'>사진</div>
						<button
							type='button'
							className='text-white mt-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
							사진 업로드
						</button>
					</div>
					<div className='w-2/6 flex flex-col justify-start gap-1 sm:gap-6'>
						<MenuEditItem label='순서' inputValue={data.id} />
						<MenuEditItem label='메뉴' inputValue={data.menu} />
						<MenuEditItem label='가격' inputValue={data.price} />
					</div>
				</div>
				<div className='mt-5 flex justify-center'>
					<button
						type='button'
						onClick={onClick}
						className='text-gray-900  hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
						취소
					</button>
					<button
						type='button'
						className='text-blue-700  hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
						onClick={onClick}>
						확인
					</button>
				</div>
			</ModalContent>
		</ModalWrapper>
	);
}
