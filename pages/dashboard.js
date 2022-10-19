import styled from "styled-components";
import Layout from "../components/UI/Layout/Layout";
import Arrow from "../assets/arrow-dashboard.svg";

const DashBoardWrapper = styled.div`
  padding-top: 10px;
  width: 83.3%;
  background-color: #fff;
`;

const DashBoardHeader = styled.div`
  width: 1140px;
  padding: 15px 20px;
  border: 0.5px solid gray;
  border-radius: 15px;
`;

export default function DashBoard() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  return (
    <Layout sideItems={["통계"]}>
      <DashBoardWrapper className=" flex flex-col items-center">
        <DashBoardHeader className="flex">
          <div style={{ width: "3%" }}>
            <Arrow />
          </div>
          <div style={{ width: "87%" }}>
            <div className="font-bold">오늘의 대시보드</div>
            <div className="text-xs">{`${year}-${month}-${day}`}</div>
          </div>
          <div className="flex items-center">사장님 이름 (logo)</div>
        </DashBoardHeader>
        <div>프랜치 갬성 카페</div>
        <div>여러개의 데이터</div>
        <div>차트</div>
      </DashBoardWrapper>
    </Layout>
  );
}
