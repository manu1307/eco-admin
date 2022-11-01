import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100px;
  background-color: #dcdcdc;
  left: 250px;
  opacity: 0.1;
`;

export default function MenuModal(props) {
  const { data } = props;

  return <ModalWrapper></ModalWrapper>;
}
