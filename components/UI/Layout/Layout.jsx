import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
import Drawer from "./Drawer";

const Background = styled.div`
	width: 100%;
	/* height: 100vh; */
	z-index: -4;
	position: absolute;
	background-color: #f6f6f6;
`;
const BodyWrapper = styled.div`
	/* max-width: 1280px; */
`;
const ChildrenWrapper = styled.div`
	width: 83.3%;
	height: 100%;
	background-color: #f6f6f6;
	position: absolute;
	left: 250px;
	top: 100px;
	z-index: -1;
	@media screen and (max-width: 1920px) {
		width: calc(100% - 250px);
		height: calc(100% - 100px);
	}
	@media screen and (max-width: 1500px) {
		left: 16.7%;
	}
	@media screen and (max-width: 640px) {
		width: 100%;
		position: relative;
		top: 0;
		left: 0;
		z-index: 0;
	}
`;

export default function Layout({ children, sideItems }) {
	return (
		<>
			<Header />
			<BodyWrapper className='static w-full flex justify-left'>
				<SideBar items={sideItems} />
				<ChildrenWrapper>{children}</ChildrenWrapper>
			</BodyWrapper>
			<Background />
		</>
	);
}
