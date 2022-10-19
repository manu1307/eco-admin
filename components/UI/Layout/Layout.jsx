import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout({ children, sideItems }) {
  return (
    <>
      <Header />
      <div className="w-full flex">
        <SideBar items={sideItems} />
        {children}
      </div>
    </>
  );
}
