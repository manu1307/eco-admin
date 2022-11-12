import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
import Drawer from "./Drawer";

const BodyWrapper = styled.div`
	/* max-width: 1280px; */
`;
const ChildrenWrapper = styled.div`
	width: 83.3%;
	position: absolute;
	left: 250px;
	top: 100px;
	z-index: -1;
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
		</>
	);
}
