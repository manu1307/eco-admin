import Layout from "../components/UI/Layout/Layout";
import Arrow from "../assets/arrow-dashboard.svg";
import styled from "styled-components";
import { useState } from "react";
import MenuModal from "../components/UI/Modal/MenuModal";

const MenuSettingWrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  background-color: #f6f6f6;
  padding-left: 50px;
`;

const MenuSettingHeader = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 70px;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 0 2px 1.5px #d8d8d8;
  background-color: #fff;
`;

const MenuSettingBody = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 90%;
  max-height: 900px;
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 0 0 2px 1.5px #d8d8d8;
  background-color: #fff;
  padding: 20px 20px;
`;

const MenuSettingBodyHeader = styled.div`
  width: 100%;
  border-radius: 15px;
  background-color: #242746;
  height: 70px;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
const MenuSettingBodyContent = styled.div`
  width: 100%;
  border-radius: 15px;
  background-color: #f5f5f5;
  height: 70px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
const CheckContent = styled.div`
  width: 10%;
  text-align: center;
`;
const NumberContent = styled.div`
  width: 10%;
  text-align: center;
`;
const MenuContent = styled.div`
  width: 30%;
`;
const PriceContent = styled.div`
  width: 100%;
  border-radius: 15px;
  background-color: #242746;
  height: 70px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const MenuSettingContent = styled.div`
  width: 100%;
  border-radius: 15px;
  background-color: #d8d8d8;
  height: 70px;
  display: flex;
  align-items: center;
`;
const CheckBox = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
`;

const dummyData = [
  { id: 1, menu: "메뉴", price: 15000 },
  { id: 2, menu: "메뉴", price: 15000 },
  { id: 3, menu: "메뉴", price: 15000 },
  { id: 4, menu: "메뉴", price: 15000 },
  { id: 5, menu: "메뉴", price: 15000 },
];
export default function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const openModal = (data) => {
    setModalData(data);
    setModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editMenu = (data) => {
    console.log(data);
    return <div>{data.menu}</div>;
  };

  return (
    <Layout
      sideItems={[
        { text: "텀블러 할인 설정", url: "" },
        { text: "단골 스탬프 설정", url: "" },
        { text: "단골 리스트", url: "" },
        { text: "메뉴 설정", url: "/service-setting-menu" },
        { text: "마감타임 설정", url: "" },
        { text: "알림 설정", url: "" },
        { text: "댓글신고", url: "" },
      ]}
    >
      <MenuSettingWrapper>
        <MenuSettingHeader className="flex align-middle drop-shadow-lg">
          <div
            style={{ width: "87%", fontSize: "20px" }}
            className="flex items-center"
          >
            <span className="mx-3">
              <Arrow />
            </span>
            <div style={{ color: "#00E1D4" }} className=" font-bold">
              서비스 설정
            </div>
            <span className="mx-3">
              <Arrow />
            </span>
            <div className=" font-bold">메뉴 설정</div>
          </div>
          <div className="flex items-center">사장님 이름(로고)</div>
        </MenuSettingHeader>
        <MenuSettingBody className="flex flex-col items-center">
          <MenuSettingBodyHeader className="flex items-center">
            <CheckContent>Check</CheckContent>
            <NumberContent>No.</NumberContent>
            <MenuContent>메뉴명</MenuContent>
            <PriceContent>가격</PriceContent>
          </MenuSettingBodyHeader>

          {dummyData.map((data, index) => {
            return (
              <MenuSettingBodyContent key={data.id}>
                <CheckContent>
                  <input type="checkbox" />
                </CheckContent>
                <NumberContent>{data.id}</NumberContent>
                <MenuContent>{data.menu}</MenuContent>
                <PriceContent>{data.price}원</PriceContent>
                <button
                  onClick={() => {
                    openModal(data);
                  }}
                >
                  edit
                </button>
              </MenuSettingBodyContent>
            );
          })}
          {modalOpen && (
            <MenuModal data={modalData} onClick={closeModal}></MenuModal>
          )}
        </MenuSettingBody>
      </MenuSettingWrapper>
    </Layout>
  );
}
