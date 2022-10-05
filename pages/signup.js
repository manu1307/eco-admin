import styled from "styled-components";
import NormalInput from "../components/UI/Input/NormalInput";
import PhoneInput from "../components/UI/Input/PhoneInput";

const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function SignUp() {
  return (
    <Center>
      <form>
        <div className="flex flex-col">
          <label>이름</label>
          <NormalInput placeholder="이름" type="text" />
        </div>
        <div className="flex flex-col">
          <label>핸드폰 번호</label>
          <PhoneInput />
        </div>
        <NormalInput placeholder="아이디를 입력하세요" type="text" />
        <div>비밀번호</div>
        <div>비밀번호 확인</div>
        <div>사업자번호인증</div>
        <div>자동로그인</div>
      </form>
    </Center>
  );
}
