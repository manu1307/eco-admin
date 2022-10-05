import styled from "styled-components";
import { useRecoilState } from "recoil";
import { signUpState } from "../../../states/SignUp/signUpState";

const Box = styled.input`
	font-size: 15px;
	width: 500px;
	border: 0.5px solid gray;
	padding: 10px 20px;
	border-collapse: collapse;
	border-radius: 10px;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border: 1px solid black;
	}
`;

export default function NormalInput(props) {
	const { type, placeholder, name } = props;
	const [signUp, setSignUpState] = useRecoilState(signUpState);

	return (
		<Box
			type={type}
			className='my-2'
			placeholder={placeholder}
			name={name}
			onChange={(event) => {
				setSignUpState((prev) => {
					console.log(prev);
					prev[event.target.name] = event.target.value;
					// signUp[event.target.name] = event.target.value;
				});
				console.log(signUp[event.target.name]);
			}}></Box>
	);
}
