import styled from "styled-components";
import Layout from "../components/UI/Layout/Layout";
import Arrow from "../assets/arrow-dashboard.svg";

const DashBoardWrapper = styled.div`
  padding-top: 20px;
  width: 83.3%;
  background-color: #fff;
`;

const DashBoardHeader = styled.div`
  width: 1140px;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 0 2px 2px #d8d8d8; ;
`;
const StoreNameWrapper = styled.div`
  width: 1140px;
  margin-top: 20px;
  height: 40px;
`;
const EcoLevel = styled.div`
  width: 100px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #ffba09;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoreName = styled.div`
  width: 190px;
  margin-left: 15px;
  font-size: 24px;
  font-weight: bold;
`;

export default function DashBoard() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  return (
    <Layout sideItems={["통계"]}>
      <DashBoardWrapper className=" flex flex-col items-center">
        <DashBoardHeader className="flex drop-shadow-lg">
          <div style={{ width: "3%" }}>
            <Arrow />
          </div>
          <div style={{ width: "87%" }}>
            <div className="font-bold">오늘의 대시보드</div>
            <div className="text-xs">{`${year}-${month}-${day}`}</div>
          </div>
          <div className="flex items-center">사장님 이름 (logo)</div>
        </DashBoardHeader>
        <StoreNameWrapper>
          <div className="flex" style={{ width: "310px" }}>
            <EcoLevel>
              <span style={{ fontSize: "12px" }}>에코레벨</span>
              <span
                className="font-bold"
                style={{ marginLeft: "0.3rem", fontSize: "14px" }}
              >
                D
              </span>
            </EcoLevel>
            <StoreName>프랜치 갬성 카페</StoreName>
          </div>
        </StoreNameWrapper>
        <div>여러개의 데이터</div>
        <div>차트</div>
      </DashBoardWrapper>
    </Layout>
  );
}
