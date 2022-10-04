import styled from "styled-components";

export default function NormalInput(props) {
  const { type, placeholder } = props;

  const Box = styled.input`
    font-size: 15px;
    width: 300px;
    border: 0.5px solid gray;
    padding: 10px 20px;
    border-collapse: collapse;
    border-radius: 10px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 2px solid black;
    }
  `;
  return <Box type={type} className="my-2" placeholder={placeholder}></Box>;
}
