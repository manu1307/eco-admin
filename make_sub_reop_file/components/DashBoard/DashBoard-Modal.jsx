import styled from "styled-components";

const ModalWrapper = styled.div`
	background-color: #000;
	width: 100%;
	max-width: 1280px;
	height: 600px;
	border-radius: 30px;
	position: absolute;
	margin-top: 20px;
	opacity: 0.8;
	z-index: 2;
	text-align: center;
`;
const ModalMessage = styled.div`
	color: #fff;
	font-weight: bold;
	font-size: ${(props) => props.fontSize}px;
	opacity: 1;
	position: relative;
	top: 100px;
	background-color: #000;
`;
const ModalButton = styled.a`
	opacity: 1;
	padding: 16px 20px;
	gap: 10px;
	width: 230px;
	height: 56px;
	background: #00e1d4;
	box-shadow: 1px 1px 2px 1.5px #242746;
	border-radius: 50px;
	position: relative;
	top: 150px;
	font-size: 24px;
	font-weight: bold;
	z-index: 10;
	cursor: pointer;
`;

export default function DashboardModal({ buttonOnClick }) {
	return (
		<ModalWrapper>
			<ModalMessage fontSize={50}>환영합니다.</ModalMessage>
			<ModalMessage fontSize={30}>매장설정을 먼저 해주세요.</ModalMessage>
			<ModalButton onClick={buttonOnClick}>매장 설정 가기</ModalButton>
		</ModalWrapper>
	);
}
