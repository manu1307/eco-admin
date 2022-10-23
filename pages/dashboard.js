import styled from "styled-components";
import Layout from "../components/UI/Layout/Layout";
import Arrow from "../assets/arrow-dashboard.svg";
import Box from "../components/DashBoard/Box";

const DashBoardWrapper = styled.div`
	padding-top: 20px;
	width: 83.3%;
	background-color: #f6f6f6;
`;

const DashBoardHeader = styled.div`
	width: 900px;
	padding: 15px 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
`;
const StoreNameWrapper = styled.div`
	width: 900px;
	margin-top: 20px;
	height: 40px;
`;
const EcoLevel = styled.div`
	width: 100px;
	height: 40px;
	padding-left: 10px;
	padding-right: 10px;
	background-color: #ffba09;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StoreName = styled.div`
	width: 190px;
	margin-left: 15px;
	font-size: 24px;
	font-weight: bold;
`;
const BoxWrapper = styled.div`
	width: 900px;
`;

export default function DashBoard() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getUTCDate();
	return (
		<Layout sideItems={["통계"]}>
			<DashBoardWrapper className='flex flex-col items-center'>
				<DashBoardHeader className='flex drop-shadow-lg'>
					<div style={{ width: "3%" }}>
						<Arrow />
					</div>
					<div style={{ width: "87%" }}>
						<div className='font-bold'>오늘의 대시보드</div>
						<div className='text-xs'>{`${year}-${month}-${day}`}</div>
					</div>
					<div className='flex items-center'>사장님 이름 (logo)</div>
				</DashBoardHeader>
				<StoreNameWrapper>
					<div className='flex' style={{ width: "310px" }}>
						<EcoLevel>
							<span style={{ fontSize: "12px" }}>에코레벨</span>
							<span
								className='font-bold'
								style={{ marginLeft: "0.3rem", fontSize: "14px" }}>
								D
							</span>
						</EcoLevel>
						<StoreName>프랜치 갬성 카페</StoreName>
					</div>
				</StoreNameWrapper>
				<BoxWrapper className='flex gap-x-5 justify-center mt-5'>
					<Box title='텀블러 적립금' data='300' unit='원' />
					<Box title='텀블러 적립금' data='300' unit='원' />
					<Box title='텀블러 적립금' data='300' unit='원' />
					<Box title='텀블러 적립금' data='300' unit='원' />
				</BoxWrapper>
				<BoxWrapper className='flex gap-x-5 justify-center mt-5'>
					<Box title='텀블러 적립금' data='300' unit='원' />
					<Box title='텀블러 적립금' data='' unit='원' />
					<Box title='텀블러 적립금' data='' unit='원' />
					<Box title='텀블러 적립금' data='300' unit='원' />
				</BoxWrapper>
				<div>차트</div>
			</DashBoardWrapper>
		</Layout>
	);
}
