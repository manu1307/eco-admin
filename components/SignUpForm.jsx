import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { idState, signUpSelector } from "../states/SignUp/signUpState";
import GenderInput from "./UI/Input/GenderInput";
import NormalInput from "./UI/Input/NormalInput";
import NumberInput from "./UI/Input/NumberInput";

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

export default function SignUpForm() {
  const SignUpData = useRecoilValue(signUpSelector);
  const [idInput, setIdInput] = useRecoilState(idState);
  const {
    id,
    password,
    passwordConfirm,
    phoneNumber,
    businessNumber,
    birthday,
    gender,
  } = SignUpData;

  const PhoneAuth = (event) => {
    event.preventDefault();
    console.log("phone auth start");
  };

  const signUpPost = async (event) => {
    event.preventDefault();
    console.log(
      typeof id,
      typeof password,
      typeof passwordConfirm,
      typeof phoneNumber,
      typeof businessNumber,
      typeof birthday,
      typeof gender,
      typeof id,
      password,
      passwordConfirm,
      phoneNumber,
      businessNumber,
      birthday,
      gender
    );

    const response = fetch("http://43.200.176.153:8080/api/members/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: id,
        password: password,
        confirmPassword: passwordConfirm,
        businessNumber: phoneNumber,
        phoneNumber: businessNumber,
        birthday: birthday,
        gender: gender,
      }),
    });
    const statusCode = (await response).status;

    console.log(statusCode);
  };

  const doubleCheckId = async () => {
    console.log(id);
    const response = await fetch(
      `http://43.200.176.153:8080/api/members/check?loginId=${id}`,
      { method: "GET" }
    );
    const fetchData = await response.json();
    if (!fetchData.check) {
      alert("중복된 아이디가 있습니다.");
      setIdInput(idInput);
    }
  };

  return (
    <>
      <div className="font-bold text-3xl text-center mb-10">회원가입</div>
      <form
        className="w-full"
        onSubmit={
          () => {
            return false;
          }
          // signUpPost
        }
      >
        <div className="flex items-center w-full">
          <label className="w-1/6">
            아이디<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput
            placeholder="아이디를 입력하세요"
            type="text"
            onChange={(event) => {
              console.log(event.target.value);
            }}
            name="id"
          />
          <AuthButton
            onClick={(event) => {
              event.preventDefault();
              doubleCheckId();
            }}
          >
            중복확인
          </AuthButton>
        </div>
        <div className="flex items-center w-full">
          <label className="w-1/6">
            비밀번호<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput
            placeholder="비밀번호를 입력하세요"
            type="password"
            name="password"
          />
        </div>
        <div className="flex items-center w-full">
          <label className="w-1/6">
            비밀번호 확인<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput
            placeholder="비밀번호를 한번 더 입력하세요"
            type="password"
            name="passwordConfirm"
          />
        </div>

        <div className="flex items-center w-full">
          <label className="w-1/6">
            이름<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput
            placeholder="이름을 입력해주세요"
            type="text"
            name="name"
          />
        </div>
        <div className="flex items-center w-full">
          <label className="w-1/6">
            전화번호<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput
            placeholder="숫자만 입력해주세요"
            type="tel"
            name="phoneNumber"
          />
          {/* <NumberInput
						firstMaxLength={3}
						secondMaxLength={4}
						thirdMaxLength={4}
					/> */}
          <AuthButton onClick={PhoneAuth}>인증하기</AuthButton>
        </div>

        <div className="flex items-center w-full">
          <label className="w-1/6">
            사업자번호<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput
            placeholder="숫자만 입력해주세요"
            type="tel"
            name="businessNumber"
          />
          {/* <NumberInput
						firstMaxLength={3}
						secondMaxLength={2}
						thirdMaxLength={5}
					/> */}
          <AuthButton onClick={PhoneAuth}>인증하기</AuthButton>
        </div>
        <div className="flex items-center w-full">
          <label className="w-1/6">
            생년월일<sup className="text-rose-600">*</sup>
          </label>
          <NormalInput type="date" name="birthday" />
        </div>
        <div className="flex items-center w-full">
          <label className="w-1/6">
            성별<sup className="text-rose-600">*</sup>
          </label>
          <GenderInput />
        </div>
        {/* <div>이용약관 동의 여러 개</div> */}
        <div className="w-full text-center mt-10">
          <SubmitButton onSubmit={signUpPost}>회원가입</SubmitButton>
        </div>
      </form>
    </>
  );
}
