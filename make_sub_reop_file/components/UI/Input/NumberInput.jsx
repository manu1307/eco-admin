import styled from "styled-components";
const Box = styled.div`
	font-size: 15px;
	width: 500px;
	border: 0.5px solid gray;
	padding: 10px 20px;
	border-collapse: collapse;
	border-radius: 10px;
	box-sizing: border-box;
`;
const NumberInputBox = styled.input`
	width: 120px;
	box-sizing: border-box;

	&:focus {
		outline: none;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
`;

export default function NumberInput(props) {
	const { firstMaxLength, secondMaxLength, thirdMaxLength } = props;

	const checkLength = (event) => {
		if (event.target.value.length > event.target.maxLength) {
			event.target.value = event.target.value.slice(0, event.target.maxLength);
		}
	};

	return (
		<Box className='border-2 my-2 flex justify-around'>
			<NumberInputBox
				type='number'
				onInput={checkLength}
				maxLength={firstMaxLength}></NumberInputBox>
			-
			<NumberInputBox
				type='number'
				onInput={checkLength}
				maxLength={secondMaxLength}></NumberInputBox>
			-
			<NumberInputBox
				type='number'
				onInput={checkLength}
				maxLength={thirdMaxLength}></NumberInputBox>
		</Box>
	);
}
