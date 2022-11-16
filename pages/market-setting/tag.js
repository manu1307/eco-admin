import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useState } from "react";

const StoreRegisterModalItemContainer = styled.div`
  width: 100%;
`;
const StoreRegisterModalItemLabel = styled.label`
  @media screen and (max-width: 640px) {
    font-size: 11px;
  }
`;

const MenuTagWrapper = styled.div`
  border: 2px solid #00000038;
`;

const MenuTagItem = styled.div`
  margin: 0 5px;
  font-size: 15px;
  font-weight: 400;
  background-color: #dedede;
  padding: 2px 4px;
  border-radius: 5px;
  @media screen and (max-width: 640px) {
    font-size: 10px;
  }
`;
const MenuTagItemInput = styled.input`
  @media screen and (max-width: 640px) {
    font-size: 10px;
  }
`;
export default function MarketSettingTag() {
  const [menuTagItem, setMenuTagItem] = useState("");
  const [menuTagList, setMenuTagList] = useState([]);

  const submitTagItem = () => {
    if (menuTagList.length >= 3) {
      alert("태그는 최대 3개까지만 등록 가능합니다.");
      return;
    }

    const token = localStorage.getItem("token");

    // axios({
    //   method: "post",
    //   url: "https://ecomap.kr/api/v1/tags",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: {
    //     type: "menu",
    //     name: menuTagItem,
    //   },
    // });
    setMenuTagList((prev) => {
      return [...prev, menuTagItem];
    });
    setMenuTagItem("");
  };
  const deleteItem = (event) => {
    const deleteTarget = event.target.parentElement.firstChild.innerText;
    const filteredTagList = menuTagList.filter((tag) => tag !== deleteTarget);
    setMenuTagList(filteredTagList);
  };

  return (
    <Layout
      sideItems={[
        { text: "매장 설정", url: "/market-setting" },
        { text: "태그 설정", url: "/market-setting/tag" },
      ]}
    >
      <StoreRegisterModalItemContainer className="flex items-center mt-3">
        <StoreRegisterModalItemLabel className="w-2/12 text-sm">
          매장 태그 (최대 3개)
        </StoreRegisterModalItemLabel>
        <div className="w-4/6 max-w-lg rounded-xl">
          {menuTagList.map((tag, index) => {
            return (
              <MenuTagItem className="flex gap-1" key={index}>
                <div>{tag}</div>
                <button onClick={deleteItem}>X</button>
              </MenuTagItem>
            );
          })}
        </div>
      </StoreRegisterModalItemContainer>
    </Layout>
  );
}
