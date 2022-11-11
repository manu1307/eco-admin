import { useRecoilState, useRecoilValue } from "recoil";
import {
	genderState,
	signUpSelector,
} from "../../../states/SignUp/signUpState";
import styled from "styled-components";

const Box = styled.div`
	font-size: 15px;
	width: 500px;
	padding: 10px 0px;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

export default function GenderInput() {
	const [genderData, setGenderData] = useRecoilState(genderState);
	const signUpData = useRecoilValue(signUpSelector);

	const handleGender = (event) => {
		setGenderData(event.target.value);
		console.log(signUpData);
	};

	return (
		<Box
			className='flex justify-left gap-10 md:w-1/12 '
			onChange={handleGender}>
			<div>
				<input type='radio' id='male' name='gender' value='man' />
				<label htmlFor='man'>남</label>
			</div>
			<div>
				<input type='radio' id='female' name='gender' value='woman' />
				<label htmlFor='woman'>여</label>
			</div>
			<div />
		</Box>
	);
}
