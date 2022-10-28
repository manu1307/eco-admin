import Link from "next/link";
import styled from "styled-components";
const SideBarWrapper = styled.div`
	width: 16.7%;
	max-width: 250px;
	background-color: #072f53;
	height: 95vh;
	margin: 0;
`;

const SideBarButton = styled.button`
	width: 100%;
	height: 100px;
	color: white;
	font-size: 20px;
	font-weight: 900;
	background-color: #121533;
	&:hover {
		color: #9dffe1;
	}
	&:focus {
		color: #242746;
		background-color: #00e1d4;
	}
	&:active {
		color: #242746;
		background-color: #00e1d4;
	}
`;

export default function SideBar({ items }) {
	const handleOnClick = (event) => {};
	return (
		<SideBarWrapper>
			{items.map((item, index) => {
				return (
					<Link key={index} href={`${item.url}`}>
						<SideBarButton onClick={handleOnClick} value={item.text}>
							{item.text}
						</SideBarButton>
					</Link>
				);
			})}
		</SideBarWrapper>
	);
}
