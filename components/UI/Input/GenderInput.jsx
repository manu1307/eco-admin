import { useRecoilState, useRecoilValue } from "recoil";
import {
	genderState,
	signUpSelector,
} from "../../../states/SignUp/signUpState";

export default function GenderInput() {
	const [genderData, setGenderData] = useRecoilState(genderState);
	const signUpData = useRecoilValue(signUpSelector);

	const handleGender = (event) => {
		setGenderData(event.target.value);
		console.log(signUpData);
	};

	return (
		<div className='flex justify-between w-1/12' onChange={handleGender}>
			<div>
				<input type='radio' id='male' name='gender' value='man' />
				<label htmlFor='man'>남</label>
			</div>
			<div>
				<input type='radio' id='female' name='gender' value='woman' />
				<label htmlFor='woman'>여</label>
			</div>
			<div />
		</div>
	);
}
