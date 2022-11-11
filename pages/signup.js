import styled from "styled-components";
import SignUpForm from "../components/SignUpForm";

const Center = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-width: 1120px;
	width: 100%;
	@media screen and (max-width: 960px) {
		position: relative;
		left: 0;
		top: 0;
		transform: translate(0%, 0%);
	}
`;

export default function SignUp() {
	return (
		<Center>
			<SignUpForm />
		</Center>
	);
}
