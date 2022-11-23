import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { idState, signUpSelector } from "../states/SignUp/signUpState";
import GenderInput from "./UI/Input/GenderInput";
import NormalInput from "./UI/Input/NormalInput";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

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
  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 12px;
    padding: 5px 10px;
    margin-left: 0px;
  }
`;

const SubmitButton = styled.a`
  border: 1px solid #00aea4;
  width: 200px;
  height: 50px;
  padding: 10px 20px;
  border-radius: 10px;
  color: #00aea4;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #00aea4;
    color: white;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
    font-size: 18px;
    padding: 10px 20px;
    margin-left: 0px;
    margin-bottom: 20px;
  }
`;
const FormItemLayout = (props) => {
  const { label, input, button } = props;
  return (
    <div className="text-black w-full md:flex items-center mt-3">
      <div id="label" className="w-full text-left sm:w-1/4">
        {label}
        <sup style={{ color: "red" }}>*</sup>
      </div>
      <div>{input}</div>
      <div className="w-full text-left">{button && button}</div>
    </div>
  );
};

export default function SignUpForm() {
  const router = useRouter();

  const SignUpData = useRecoilValue(signUpSelector);
  const {
    id,
    password,
    passwordConfirm,
    phoneNumber,
    name,
    businessNumber,
    birthday,
    gender,
  } = SignUpData;

  const PhoneAuth = (event) => {
    event.preventDefault();
    console.log("phone auth start");
  };

  const goHome = () => {};

  const signUpPost = async (event) => {
    event.preventDefault();
    console.log(
      password,
      passwordConfirm,
      phoneNumber,
      name,
      businessNumber,
      birthday,
      gender
    );
    axios({
      method: "post",
      url: "https://ecomap.kr/api/v1/members/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        loginId: id,
        password: password,
        confirmPassword: passwordConfirm,
        name: name,
        businessNumber: phoneNumber,
        phoneNumber: businessNumber,
        birthday: birthday,
        gender: gender,
      }),
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        alert("입력을 확인해주세요");
      }
    });
  };

  const doubleCheckId = async () => {
    axios
      .get(`https://ecomap.kr/api/v1/members/check?loginId=${id}`)
      .then((res) => {
        if (res.data.check) {
          alert("사용 가능한 아이디입니다.");
        } else {
          alert("이미 존재하는 아이디입니다.");
        }
      });
  };

  return (
    <div className="overflow-visible">
      <div className="font-bold text-2xl mt-5 sm:mt-0 sm:text-3xl text-center text-black sm:mb-10 max-w-screen-xl">
        에코맵 사업자 회원가입
      </div>
      <form
        className="w-5/6 lg:w-full flex flex-col text-center mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormItemLayout
          label="아이디"
          input={
            <NormalInput
              placeholder="아이디를 입력하세요"
              type="text"
              onChange={(event) => {
                console.log(event.target.value);
              }}
              name="id"
              required
            />
          }
          button={
            <AuthButton
              onClick={(event) => {
                event.preventDefault();
                doubleCheckId();
              }}
            >
              중복확인
            </AuthButton>
          }
        ></FormItemLayout>
        <FormItemLayout
          label="비밀번호"
          input={
            <NormalInput
              placeholder="비밀번호를 입력하세요"
              type="password"
              name="password"
            />
          }
        ></FormItemLayout>
        <FormItemLayout
          label="비밀번호 확인"
          input={
            <NormalInput
              placeholder="비밀번호를 한번 더 입력하세요"
              type="password"
              name="passwordConfirm"
            />
          }
        ></FormItemLayout>

        <FormItemLayout
          label="이름"
          input={
            <NormalInput
              placeholder="이름을 입력해주세요"
              type="text"
              name="name"
            />
          }
        ></FormItemLayout>
        <FormItemLayout
          label="전화번호"
          input={
            <NormalInput
              placeholder="숫자만 입력해주세요"
              type="tel"
              name="phoneNumber"
            />
          }
          button={<AuthButton onClick={PhoneAuth}>인증하기</AuthButton>}
        ></FormItemLayout>
        <FormItemLayout
          label="사업자번호"
          input={
            <NormalInput
              placeholder="숫자만 입력해주세요"
              type="tel"
              name="businessNumber"
            />
          }
          button={<AuthButton onClick={PhoneAuth}>인증하기</AuthButton>}
        ></FormItemLayout>
        <FormItemLayout
          label="생년월일"
          input={<NormalInput type="date" name="birthday" />}
        ></FormItemLayout>
        <FormItemLayout label="성별" input={<GenderInput />}></FormItemLayout>

        {/* <div>이용약관 동의 여러 개</div> */}
        <div className="w-full text-center mt-10">
          <Link href="/">
            <SubmitButton>취소</SubmitButton>
          </Link>
          <SubmitButton onClick={signUpPost}>회원가입</SubmitButton>
        </div>
      </form>
    </div>
  );
}
