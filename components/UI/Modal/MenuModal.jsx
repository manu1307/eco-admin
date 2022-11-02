import styled from "styled-components";

const ModalWrapper = styled.div`
	width: calc(100% - 250px);
	height: 100%;
	position: absolute;
	top: 100px;
	background-color: rgba(220, 220, 220, 0.5);
	left: 250px;
	padding-top: 10%;
	display: flex;
	justify-content: center;
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
`;
const MenuInput = styled.input`
	width: 100%;
	padding: 10px 20px;
	border: 2px solid lightgray;
	border-radius: 5px;
`;

const MenuEditItem = () => {
	return;
};

export default function MenuModal(props) {
	const { data, onClick } = props;

	return (
		<ModalWrapper>
			<ModalContent>
				<div className='w-full h-5/6 flex gap-5'>
					<div className='w-4/6'>
						<div className='border-2 h-5/6'>사진</div>
						<button
							type='button'
							className='text-white mt-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
							사진 업로드
						</button>
					</div>
					<div className='w-2/6 flex flex-col justify-start gap-6'>
						<div>
							<div>순서</div>
							<MenuInput value={data.id} />
						</div>
						<div>
							<div>메뉴</div>
							<MenuInput value={data.menu} />
						</div>
						<div>
							<div>가격</div>
							<MenuInput value={data.price} />
						</div>
					</div>
				</div>
				<div className='mt-5 flex justify-center'>
					<button
						type='button'
						onClick={onClick}
						className='text-gray-900 font-black hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>
						취소
					</button>
					<button
						type='button'
						class='text-blue-700 font-black hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
						onClick={onClick}>
						확인
					</button>
				</div>
			</ModalContent>
		</ModalWrapper>
	);
}
