import Layout from "../components/UI/Layout/Layout";
import Arrow from "../assets/arrow-dashboard.svg";
import styled from "styled-components";

const MenuSettingWrapper = styled.div`
	padding-top: 20px;
	width: 100%;
	background-color: #f6f6f6;
	padding-left: 50px;
`;

const MenuSettingHeader = styled.div`
	width: 100%;
	max-width: 1280px;
	height: 70px;
	padding: 15px 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
`;

const MenuSettingBody = styled.div`
	width: 100%;
	max-width: 1280px;
	height: 90%;
	max-height: 900px;
	margin-top: 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
	padding: 20px 20px;
`;

const MenuSettingBodyHeader = styled.div`
	width: 100%;
	border-radius: 15px;
	background-color: #242746;
	height: 70px;
	color: white;
	font-size: 20px;
	font-weight: 700;
	display: flex;
	align-items: center;
`;
const CheckContent = styled.div`
	width: "15%";
	text-align: center;
`;
const NumberContent = styled.div`
	width: "10%";
	text-align: center;
`;
const MenuContent = styled.div`
	width: "25%";
`;
const PriceContent = styled.div`
	width: "50%";
`;
const MenuSettingContent = styled.div`
	width: 100%;
	border-radius: 15px;
	background-color: #d8d8d8;
	height: 70px;
	display: flex;
	align-items: center;
`;
const CheckBox = styled.div`
	width: 25px;
	height: 25px;
	border: 1px solid black;
`;

export default function DashBoard() {
	return (
		<Layout
			sideItems={[
				{ text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "" },
				{ text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/service-setting-menu" },
				{ text: "마감타임 설정", url: "" },
				{ text: "알림 설정", url: "" },
				{ text: "댓글신고", url: "" },
			]}>
			<MenuSettingWrapper>
				<MenuSettingHeader className='flex align-middle drop-shadow-lg'>
					<div
						style={{ width: "87%", fontSize: "20px" }}
						className='flex items-center'>
						<span className='mx-3'>
							<Arrow />
						</span>
						<div style={{ color: "#00E1D4" }} className=' font-bold'>
							서비스 설정
						</div>
						<span className='mx-3'>
							<Arrow />
						</span>
						<div className=' font-bold'>메뉴 설정</div>
					</div>
					<div className='flex items-center'>사장님 이름(로고)</div>
				</MenuSettingHeader>
				<MenuSettingBody className='flex flex-col items-center'>
					<MenuSettingBodyHeader>
						<CheckContent>Check</CheckContent>
						<NumberContent>No.</NumberContent>
						<MenuContent>메뉴명</MenuContent>
						<PriceContent>가격</PriceContent>
					</MenuSettingBodyHeader>
					<MenuSettingContent>
						<CheckBox>v</CheckBox>
						<div>1</div>
						<div>메뉴입니다</div>
						<div>15,000원</div>
					</MenuSettingContent>
				</MenuSettingBody>
			</MenuSettingWrapper>
		</Layout>
	);
}
