import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const BodyWrapper = styled.div`
	max-width: 1280px;
	margin: 0 auto;
`;

export default function Layout({ children, sideItems }) {
	return (
		<>
			<Header />
			<BodyWrapper className='w-full flex justify-center'>
				<SideBar items={sideItems} />
				{children}
			</BodyWrapper>
		</>
	);
}
