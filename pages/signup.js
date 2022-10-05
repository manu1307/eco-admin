import styled from "styled-components";
import NormalInput from "../components/UI/Input/NormalInput";
import NumberInput from "../components/UI/Input/NumberInput";

const Center = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-width: 1120px;
	width: 100%;
`;

const AuthButton = styled.button`
	border: 1px solid #00aea4;
	width: 150px;
	padding: 10px 20px;
	margin-left: 40px;
	border-radius: 10px;
	color: #00aea4;
	font-weight: bold;
	&:hover {
		transition: all 0.2s ease-in-out;
		background-color: #00aea4;
		color: white;
	}
`;

const SubmitButton = styled.button`
	border: 1px solid #00aea4;
	width: 200px;
	padding: 10px 20px;
	border-radius: 10px;
	color: #00aea4;
	font-weight: bold;
	font-size: 20px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background-color: #00aea4;
		color: white;
	}
`;

export default function SignUp() {
	const PhoneAuth = (event) => {
		event.preventDefault();
		console.log("phone auth start");
	};

	return (
		<Center>
			<div className='font-bold text-3xl text-center mb-10'>회원가입</div>
			<form
				className='w-full'
				onSubmit={(event) => {
					event.preventDefault();
				}}>
				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						아이디<sup className='text-rose-600'>*</sup>
					</label>
					<NormalInput
						placeholder='아이디를 입력하세요'
						type='text'
						onChange={() => {
							"written";
						}}
						name='id'
					/>
					<AuthButton>중복확인</AuthButton>
				</div>
				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						비밀번호<sup className='text-rose-600'>*</sup>
					</label>
					<NormalInput
						placeholder='비밀번호를 입력하세요'
						type='password'
						name='password'
					/>
				</div>
				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						비밀번호 확인<sup className='text-rose-600'>*</sup>
					</label>
					<NormalInput
						placeholder='비밀번호를 한번 더 입력하세요'
						type='password'
						name='passwordConfirm'
					/>
				</div>

				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						이름<sup className='text-rose-600'>*</sup>
					</label>
					<NormalInput
						placeholder='이름을 입력해주세요'
						type='text'
						name='name'
					/>
				</div>
				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						전화번호<sup className='text-rose-600'>*</sup>
					</label>
					<NumberInput
						firstMaxLength={3}
						secondMaxLength={4}
						thirdMaxLength={4}
					/>
					<AuthButton onClick={PhoneAuth}>인증하기</AuthButton>
				</div>

				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						사업자번호<sup className='text-rose-600'>*</sup>
					</label>
					<NumberInput
						firstMaxLength={3}
						secondMaxLength={2}
						thirdMaxLength={5}
					/>
					<AuthButton onClick={PhoneAuth}>인증하기</AuthButton>
				</div>
				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						생년월일<sup className='text-rose-600'>*</sup>
					</label>
					<NormalInput type='date' />
				</div>
				<div className='flex items-center w-full'>
					<label className='w-1/6'>
						성별<sup className='text-rose-600'>*</sup>
					</label>
					<div className='flex justify-between w-1/12'>
						<div>
							<input type='radio' id='male' name='drone' value='남자' />
							<label htmlFor='male'>남</label>
						</div>
						<div>
							<input type='radio' id='female' name='drone' value='female' />
							<label htmlFor='female'>여</label>
						</div>
						<div />
					</div>
				</div>
				{/* <div>이용약관 동의 여러 개</div> */}
				<div className='w-full text-center mt-10'>
					<SubmitButton>회원가입</SubmitButton>
				</div>
			</form>
		</Center>
	);
}
