import Link from "next/link";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SideBarOpenState } from "../../../states/ServiceSetting/SideBarOpenState";

const ToggleButton = styled.label`
  background-color: #072f53;
  border: none;
`;

export default function Drawer() {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(SideBarOpenState);

  const DrawerMenu = [
    {
      bname: "대시보드",
      bnameURL: "/dashboard",
    },
    {
      bname: "매장 설정",
      bnameURL: "/storeSetting",
    },
    {
      bname: "매장 관리",
      bnameURL: "/storeManage",
      detail: [{ name: "qr 코드", url: "/storeManage/qrCode" }],
    },
    {
      bname: "서비스 설정",
      bnameURL: "/serviceSetting",
      detail: [
        { name: "메뉴 설정", url: "/serviceSetting/menu" },
        { name: "마감 할인 설정", url: "/serviceSetting/closingsale" },
        { name: "태그 설정", url: "/serviceSetting/tag" },
      ],
    },
  ];
  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        onChange={() => {
          if (sideBarOpen === true) {
            setTimeout(() => {
              setSideBarOpen((prev) => !prev);
            }, 500);
          } else {
            setSideBarOpen((prev) => {
              return !prev;
            });
          }
        }}
      />
      <div className="drawer-content z-10">
        <ToggleButton
          htmlFor="my-drawer"
          className="btn drawer-button z-20"
          // onClick={}
        >
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
        <label htmlFor="my-drawer" className="drawer-overlay z-10"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {DrawerMenu.map((menuItem, index) => {
            return (
              <li key={index}>
                <Link href={menuItem.bnameURL}>
                  <a>{menuItem.bname}</a>
                </Link>
                {menuItem.detail?.map((detailMenu, index) => {
                  return (
                    <Link key={index} href={detailMenu.url}>
                      <a className="indent-2">- {detailMenu.name}</a>
                    </Link>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
