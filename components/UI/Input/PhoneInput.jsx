import styled from "styled-components";

export default function PhoneInput(props) {
  const { type, placeholder } = props;

  const Box = styled.div`
    font-size: 15px;
    width: 300px;
    border: 0.5px solid gray;
    padding: 10px 20px;
    border-collapse: collapse;
    border-radius: 10px;
    box-sizing: border-box;
  `;
  const NumberInput = styled.input`
    width: 50px;
    margin-left: 5px;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  `;
  return (
    <Box className="border-2">
      <NumberInput type="number"></NumberInput>-
      <NumberInput type="number"></NumberInput>-
      <NumberInput type="number"></NumberInput>
    </Box>
  );
}
