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
  @media screen and (max-width: 640px) {
    width: 100vw;
  }
`;
const MenuRegisterModalContainer = styled.div`
  width: 800px;
  height: 500px;
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 20px;
  position: relative;
  top: 10%;
  left: 10%;
  @media screen and (max-width: 1140px) {
    height: 90vh;
  }
  @media screen and (max-width: 640px) {
    width: 90%;
    top: 20px;
    left: 0%;
    height: 360px;
    margin: 0 auto;
    overflow-y: scroll;
  }
`;
const MenuRegisterModalItemContainer = styled.div`
  width: 100%;
`;
const MenuRegisterModalItemLabel = styled.label`
  @media screen and (max-width: 640px) {
    font-size: 11px;
  }
`;
const MenuRegisterModalItemInput = styled.input`
  border: 2px solid #00000038;
  @media screen and (max-width: 640px) {
    font-size: 10px;
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

const MenuRegisterModalItem = (props) => {
  const { label, type, placeholder, onChange } = props;

  return (
    <MenuRegisterModalItemContainer className="flex items-center mt-3">
      <MenuRegisterModalItemLabel className="w-2/6 text-sm">
        {label}
      </MenuRegisterModalItemLabel>
      <MenuRegisterModalItemInput
        type={type}
        placeholder={placeholder}
        className="input-bordered rounded-xl w-5/6 max-w-lg font-normal"
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
          <MenuRegisterModalItemLabel className="w-2/6 text-sm">
            태그 (최대 3개)
          </MenuRegisterModalItemLabel>
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
              <MenuTagItemInput
                type="text"
                placeholder="#태그 입력"
                className="border-0 rounded-xl w-1/3 font-normal"
                value={menuTagItem}
                onChange={(event) => {
                  setMenuTagItem(event.target.value);
                }}
                onKeyPress={onKeyPress}
              />{" "}
            </div>
          </MenuTagWrapper>
        </MenuRegisterModalItemContainer>
        <div className="my-3">
          <MenuRegisterModalItemLabel
            className="block mb-2 text-sm  text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            매장 사진 업로드
          </MenuRegisterModalItemLabel>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(event) => {
              setStoreImage(() => {
                return event.target.files[0];
              });
            }}
          />
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
