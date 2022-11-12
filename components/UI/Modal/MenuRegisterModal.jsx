import styled from "styled-components";

const MenuRegisterModalWrapper = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
`;
const MenuRegisterModalContainer = styled.div`
	width: 500px;
	height: 500px;
	max-height: 500px;
	background-color: red;
	position: relative;
	top: 10%;
	left: 10%;
`;

export default function MenuRegisterModal() {
	return (
		<MenuRegisterModalWrapper>
			<MenuRegisterModalContainer></MenuRegisterModalContainer>
		</MenuRegisterModalWrapper>
	);
}
