import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="w-full flex">
        <SideBar />
        {children}
      </div>
    </>
  );
}
