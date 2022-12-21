import styled from "styled-components";
import Arrow from "../../../assets/arrow-dashboard.svg";

const Header = styled.div`
	width: 100%;
	max-width: 1140px;
	height: 70px;
	padding: 15px 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
	@media screen and (max-width: 640px) {
		height: 60px;

		padding: 15px 10px;
	}
`;

export default function ContentHeader(props) {
	const { firstCategory, secondCategory } = props;

	return (
		<Header className='flex align-middle drop-shadow-lg'>
			<div
				style={{ fontSize: "20px" }}
				className='flex items-center w-3/5 sm:w-4/5'>
				<span className='mx-2 sm:mx-3'>
					<Arrow />
				</span>
				<div
					style={{ color: "#00E1D4" }}
					className='font-bold text-sm sm:text-lg'>
					{firstCategory}
				</div>
				<span className='mx-2 sm:mx-3'>
					<Arrow />
				</span>
				<div className='font-bold text-sm sm:text-lg '>{secondCategory}</div>
			</div>
			<div className='flex justify-end items-center text-xs  w-2/5 sm:text-md sm:w-1/5'>
				사장님 이름
				{/* (로고) */}
			</div>
		</Header>
	);
}
