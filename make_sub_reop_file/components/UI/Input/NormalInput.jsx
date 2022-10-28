import styled from "styled-components";
import { snapshot_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import {
	birthdayState,
	businessNumberState,
	idState,
	nameState,
	passwordConfirmState,
	passwordState,
	phoneNumberState,
	signUpSelector,
	signUpState,
} from "../../../states/SignUp/signUpState";

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

	const [idData, setIdData] = useRecoilState(idState);
	const [passwordData, setPasswordData] = useRecoilState(passwordState);
	const [passwordConfirmData, setpasswordConfirmData] =
		useRecoilState(passwordConfirmState);
	const [nameData, setNameData] = useRecoilState(nameState);
	const [phoneNumberData, setPhoneNumberData] =
		useRecoilState(phoneNumberState);
	const [birthdayData, setBirthdayData] = useRecoilState(birthdayState);
	const [businessNumberData, setBusinessNumberData] =
		useRecoilState(businessNumberState);

	const signUpData = useRecoilValue(signUpSelector);

	return (
		<Box
			type={type}
			className='my-2'
			placeholder={placeholder}
			name={name}
			onChange={(event) => {
				if (event.target.name === "id") {
					setIdData(event.target.value);
				}
				if (event.target.name === "password") {
					setPasswordData(event.target.value);
				}
				if (event.target.name === "passwordConfirm") {
					setpasswordConfirmData(event.target.value);
				}
				if (event.target.name === "name") {
					setNameData(event.target.value);
				}
				if (event.target.name === "phoneNumber") {
					setPhoneNumberData(event.target.value);
				}
				if (event.target.name === "businessNumber") {
					setBusinessNumberData(event.target.value);
				}
				if (event.target.name === "birthday") {
					setBirthdayData(event.target.value);
				}
				console.log(signUpData);
			}}></Box>
	);
}
