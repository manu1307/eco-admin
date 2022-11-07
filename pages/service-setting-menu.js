import Layout from "../components/UI/Layout/Layout";
import Arrow from "../assets/arrow-dashboard.svg";
import styled from "styled-components";
import { useState } from "react";
import MenuModal from "../components/UI/Modal/MenuModal";
import { useRecoilState } from "recoil";
import { SideBarOpenState } from "../states/ServiceSetting/SideBarOpenState";

const MenuSettingWrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  background-color: #f6f6f6;
  padding-left: 50px;
  @media screen and (max-width: 500px) {
    padding: 10px;
    height: 90vh;
  }
`;

const MenuSettingHeader = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 70px;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 0 2px 1.5px #d8d8d8;
  background-color: #fff;
  @media screen and (max-width: 500px) {
    padding: 10px;
  }
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
  @media screen and (max-width: 500px) {
    font-size: 12px;
    height: 50px;
    padding-left: 10px;
  }
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
  @media screen and (max-width: 500px) {
    font-size: 12px;
    height: 50px;
    padding-left: 10px;
  }
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
  width: 40%;
`;

const dummyData = [
  { id: 1, menu: "아메리카노", price: 4000 },
  { id: 2, menu: "카페라떼", price: 4500 },
  { id: 3, menu: "초코 프라푸치노", price: 5000 },
  { id: 4, menu: "아샷추", price: 3000 },
  { id: 5, menu: "마카롱", price: 2000 },
];
export default function DashBoard() {
  console.log(SideBarOpenState);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [menuZIndex, setMenuZIndex] = useState("z-0");
  const [sideBarOpen, setSideBarOpenState] = useRecoilState(SideBarOpenState);

  const openModal = (data) => {
    setModalData(data);
    setModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setModalOpen(false);
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
      <MenuSettingWrapper className={sideBarOpen ? "z-0" : "z-10"}>
        <MenuSettingHeader className="flex align-middle drop-shadow-lg">
          <div
            style={{ fontSize: "20px" }}
            className="flex items-center w-3/5 sm:w-4/5"
          >
            <span className="mx-3">
              <Arrow />
            </span>
            <div
              style={{ color: "#00E1D4" }}
              className="font-bold text-sm sm:text-lg"
            >
              서비스 설정
            </div>
            <span className="mx-3">
              <Arrow />
            </span>
            <div className="font-bold text-sm sm:text-lg ">메뉴 설정</div>
          </div>
          <div className="flex justify-end items-center text-xs  w-2/5  sm:text-lg sm:w-1/5">
            사장님 이름(로고)
          </div>
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
