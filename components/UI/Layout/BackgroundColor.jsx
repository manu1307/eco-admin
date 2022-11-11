import styled from "styled-components";

const Background = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #f6f6f6;
	z-index: -1;
	position: absolute;
	top: 0px;
	left: 0;
	@media screen and (max-width: 640px) {
		top: 50px;
	}
`;
export default function BackgroundColor() {
	return <Background />;
}
