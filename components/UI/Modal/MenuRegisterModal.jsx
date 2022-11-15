import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const MenuRegisterModalWrapper = styled.div`
  width: 90vw;
  height: 100vh;
  background-color: #80808073;
  position: absolute;
  top: 0;
  left: 0;
`;
const MenuRegisterModalContainer = styled.div`
  width: 800px;
  height: 800px;
  /* max-height: 500px; */
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 20px;
  position: relative;
  top: 10%;
  left: 10%;
`;
const MenuRegisterModalItemContainer = styled.div`
  width: 100%;
`;
const MenuRegisterModalItemInput = styled.input`
  border: 2px solid #00000038;
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
`;

const MenuRegisterModalItem = (props) => {
  const { label, type, placeholder, onChange } = props;

  return (
    <MenuRegisterModalItemContainer className="flex items-center mt-3">
      <label className="w-2/6 text-sm">{label}</label>
      <MenuRegisterModalItemInput
        type={type}
        placeholder={placeholder}
        className="input input-bordered rounded-xl w-5/6 max-w-lg font-normal"
        onChange={onChange}
      />
    </MenuRegisterModalItemContainer>
  );
};

export default function MenuRegisterModal(props) {
  const { open, changeOpen } = props;

  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuOrder, setMenuOrder] = useState("");

  const [menuTagItem, setMenuTagItem] = useState("");
  const [menuTagList, setMenuTagList] = useState([]);

  const onKeyPress = (event) => {
    const currentTag = event.target.value;
    if (currentTag.length !== 0 && event.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    if (menuTagList.length >= 3) {
      alert("태그는 최대 3개까지만 등록 가능합니다.");
      return;
    }

    const token = localStorage.getItem("token");

    axios({
      method: "post",
      url: "https://ecomap.kr/api/v1/tags",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        type: "menu",
        name: menuTagItem,
      },
    });
    setMenuTagList((prev) => {
      return [...prev, menuTagItem];
    });
    setMenuTagItem("");
  };
  const deleteItem = (event) => {
    const deleteTarget = event.target.parentElement.firstChild.innerText;
    console.log(deleteTarget);
    const filteredTagList = menuTagList.filter((tag) => tag !== deleteTarget);
    setMenuTagList(filteredTagList);
  };

  const registerMenu = () => {
    const token = localStorage.getItem("token");
    const menuData = {
      storeId: 1,
      name: menuName,
      price: parseInt(menuPrice),
      description: menuDescription ? menuDescription : null,
      orders: menuOrder,
      tagIds: [1, 2],
    };
    const json = JSON.stringify(menuData);
    const blob = new Blob([json], {
      type: "application/json",
    });
    const data = new FormData();
    data.append("createMenuDto", blob);

    axios({
      method: "post",
      url: "https://ecomap.kr/api/v1/menus",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    }).then((Response) => {
      console.log(Response);
    });
  };

  return (
    <MenuRegisterModalWrapper className={!open && "hidden"}>
      <MenuRegisterModalContainer>
        <MenuRegisterModalItem
          label="메뉴명"
          type="text"
          placeholder="ex. 아메리카노"
          onChange={(event) => {
            setMenuName(event.target.value);
          }}
        />
        <MenuRegisterModalItem
          label="메뉴 가격"
          type="number"
          placeholder="ex. 3000"
          onChange={(event) => {
            setMenuPrice(event.target.value);
          }}
        />
        <MenuRegisterModalItem
          label="메뉴 상세 설명"
          type="text"
          placeholder="(선택사항)"
          onChange={(event) => {
            setMenuDescription(event.target.value);
          }}
        />
        <MenuRegisterModalItem
          label="메뉴 노출 순서"
          type="text"
          placeholder="ex. 1순위 = 1"
          onChange={(event) => {
            setMenuOrder(event.target.value);
          }}
        />
        <MenuRegisterModalItemContainer className="flex items-center mt-3">
          <label className="w-2/6 text-sm">태그 (최대 3개)</label>
          <MenuTagWrapper className="w-4/6 max-w-lg rounded-xl">
            <div className="flex items-center w-full">
              {menuTagList.map((tag, index) => {
                return (
                  <MenuTagItem className="flex gap-1" key={index}>
                    <div>{tag}</div>
                    <button onClick={deleteItem}>X</button>
                  </MenuTagItem>
                );
              })}
              <input
                type="text"
                placeholder="#태그 입력"
                className="input border-0 rounded-xl w-1/3 font-normal"
                value={menuTagItem}
                onChange={(event) => {
                  setMenuTagItem(event.target.value);
                }}
                onKeyPress={onKeyPress}
              />{" "}
            </div>
          </MenuTagWrapper>
        </MenuRegisterModalItemContainer>
        <div className="w-full my-5">
          <label for="menu" className="w-2/6 text-sm">
            메뉴 사진 업로드
          </label>
          <input
            type="file"
            id="menu"
            name="menu"
            accept="image/png, image/jpeg"
          ></input>
        </div>
        <button
          type="button"
          onClick={registerMenu}
          className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          등록
        </button>
        <button
          type="button"
          onClick={() => {
            changeOpen(() => {
              return false;
            });
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          취소
        </button>
      </MenuRegisterModalContainer>
    </MenuRegisterModalWrapper>
  );
}
