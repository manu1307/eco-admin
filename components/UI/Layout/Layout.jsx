import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
import Drawer from "./Drawer";

const BodyWrapper = styled.div`
  /* max-width: 1280px; */
`;

export default function Layout({ children, sideItems }) {
  return (
    <>
      <Header className="fixed" />
      <BodyWrapper className="static w-full flex justify-left">
        <SideBar items={sideItems} />
        {children}
      </BodyWrapper>
    </>
  );
}
