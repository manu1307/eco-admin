import styled from "styled-components";
const BoxWrapper = styled.div`
	width: 100%;
	height: 200px;
	text-align: left;
	border-radius: 30px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
	color: black;

	@media screen and (max-width: 640px) {
		box-sizing: content-box;
		height: 150px;
		margin: 0 auto;
		margin-bottom: 15px;
	}
`;
const VerticalCenter = styled.div`
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;
const Title = styled.div`
	position: relative;
	top: -20px;
	padding-left: 20px;
	@media screen and (max-width: 640px) {
		top: 0px;
	}
`;
const Data = styled.div`
	position: relative;
	padding-left: 20px;
	font-size: 36px;
	font-weight: 700;
`;
const Stats = styled.div`
	padding-left: 20px;
`;

export default function Box(props) {
	const { title, data, unit } = props;

	return (
		<BoxWrapper>
			<VerticalCenter>
				<Title>{title}</Title>
				<Data>
					{data >= 0 ? data : "-"}
					<span>{unit}</span>
				</Data>
				<Stats>15.5% 상승</Stats>
			</VerticalCenter>
		</BoxWrapper>
	);
}
