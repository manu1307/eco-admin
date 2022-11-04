import Link from "next/link";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SideBarToggleState } from "../../../states/ServiceSetting/ServiceSettingState";

const ToggleButton = styled.label`
  background-color: #072f53;
  border: none;
`;

export default function Drawer() {
  const [toggleState, useToggleState] = useRecoilState(SideBarToggleState);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <ToggleButton htmlFor="my-drawer" className="btn drawer-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </ToggleButton>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link href="/dashboard">
              <a>대시보드</a>
            </Link>
          </li>
          <li>
            <a>서비스 설정</a>
            <a style={{ textIndent: "1rem" }}>- 텀블러 할인 설정</a>
            <Link href="/service-setting-menu">
              <a style={{ textIndent: "1rem" }}>- 메뉴 설정</a>
            </Link>
            <a style={{ textIndent: "1rem" }}>- 텀블러 할인 마감타임 설정</a>
            <a style={{ textIndent: "1rem" }}>- 알림 설정</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
