import styled from "styled-components";

const ModalWrapper = styled.div`
  width: calc(100% - 250px);
  height: 100%;
  position: absolute;
  top: 100px;
  background-color: rgba(220, 220, 220, 0.5);
  left: 250px;
  padding-top: 10%;
  display: flex;
  justify-content: center;
`;
const ModalContent = styled.div`
  width: 90%;
  max-width: 800px;
  height: 80%;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
`;

export default function MenuModal(props) {
  const { data, onClick } = props;

  return (
    <ModalWrapper>
      <ModalContent>
        <div style={{ display: "flex", height: "85%", width: "100%" }}>
          <div className="border-2" style={{ width: "60%" }}>
            사진
          </div>
          <div className="flex flex-col">
            <input value={data.id} />
            <input value={data.menu} />
            <input value={data.price} />
          </div>
        </div>
        <button onClick={onClick}>취소</button>
      </ModalContent>
    </ModalWrapper>
  );
}
