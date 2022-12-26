import styled from "styled-components";
import Postcode from "../../MarketSetting/PostCode";

const AddressSearchModalWrapper = styled.div``;
const AddressSearchModalBackground = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	@media screen and (max-width: 640px) {
		width: 100%;
	}
`;
const AddressSearchModalContainer = styled.div`
	width: 500px;
	padding: 20px;
	background-color: white;
	color: black;
	border-radius: 20px;
	position: absolute;
	top: 100px;
	left: 200px;
	z-index: 3;
	@media screen and (max-width: 1140px) {
		height: 90vh;
	}
	@media screen and (max-width: 640px) {
		width: 90%;
		top: 20px;
		left: 5%;
		height: 500px;
		margin: 0 auto;
		overflow-y: scroll;
	}
`;

export default function AddressSearchModal(props) {
	const { changeOpen, changeAddress } = props;

	return (
		<AddressSearchModalWrapper>
			<AddressSearchModalContainer>
				<div className=' '>
					<Postcode changeOpen={changeOpen} changeAddress={changeAddress} />
				</div>
			</AddressSearchModalContainer>
			<AddressSearchModalBackground
				onClick={() => {
					changeOpen(() => {
						return false;
					});
				}}></AddressSearchModalBackground>
		</AddressSearchModalWrapper>
	);
	1;
}
