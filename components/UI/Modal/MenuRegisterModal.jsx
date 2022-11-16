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

const MenuTagItemButton = styled.button`
  padding: 1px 5px;
  font-weight: 400;
  color: #595959;
  border-radius: 10px;
  border: 1px solid #595959;
  :hover {
    color: black;
  }
`;
const MenuTagSelected = styled.div`
  padding: 1px 5px;
  font-weight: 400;
  color: black;
  border-radius: 10px;
  background-color: #a1d2ff;
  border: 1px solid #5cb0ff;
  :hover {
    color: black;
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

const MenuTagExample = [
  "맛있는 아메리카노",
  "고소함",
  "디카페인 가능",
  "벤티 사이즈",
  "테이크아웃",
  "얼음 많이",
];

export default function MenuRegisterModal({ open, changeOpen, tagData }) {
  console.log(tagData);
  //   const { open, changeOpen } = props;

  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuOrder, setMenuOrder] = useState("");

  const [menuTagItem, setMenuTagItem] = useState("");
  const [menuTagList, setMenuTagList] = useState([]);

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
        <div className="flex gap-4 ">
          <div className="w-1/2">
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
          </div>

          <div className="border-2 w-1/2 rounded-xl">이미지</div>
        </div>

        <MenuRegisterModalItemContainer className="flex items-center mt-3">
          <MenuRegisterModalItemLabel className="w-2/6 text-sm">
            메뉴 태그 (최대 3개)
          </MenuRegisterModalItemLabel>
          <div>
            <div className="w-full flex flex-wrap gap-2 max-w-lg rounded-xl mb-3 sm:h-5">
              {menuTagList?.map((tag, index) => {
                return (
                  <MenuTagSelected
                    className="flex items-center gap-1 text-sm"
                    key={index}
                  >
                    <div>#{tag}</div>
                    <button
                      onClick={() => {
                        setMenuTagList(() => {
                          const deleteTarget = tag;
                          const filteredList = menuTagList.filter(
                            (menuTag) => menuTag !== deleteTarget
                          );
                          return filteredList;
                        });
                      }}
                    >
                      ×
                    </button>
                  </MenuTagSelected>
                );
              })}
            </div>
            <div className="w-full flex flex-wrap gap-2 max-w-lg rounded-xl">
              {MenuTagExample.map((tag, index) => {
                return (
                  <MenuTagItemButton
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (menuTagList.length < 3) {
                        axios({
                          method: "post",
                          url: "https://ecomap.kr/api/v1/tags",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          data: {
                            type: "menu",
                            name: tag,
                          },
                        }).then((response) => {
                          axios({
                            method: "get",
                            url: "https://ecomap.kr/api/v1/tags/type?type=menu",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }).then((response) => {
                            console.log(response);
                          });
                          console.log(response.status);
                        });
                      }
                      setMenuTagList((prev) => {
                        if (prev.length < 3) {
                          return [...prev, tag];
                        } else {
                          alert("태그는 3개까지만 가능합니다.");
                          return prev;
                        }
                      });
                    }}
                    className="flex gap-1 text-sm"
                    key={index}
                  >
                    <div>#{tag}</div>
                  </MenuTagItemButton>
                );
              })}
            </div>
          </div>
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

MenuRegisterModal.getInitialProps = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch({
    url: "https://ecomap.kr/api/v1/tags/type?type=menu",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  console.log(json);

  return { tagData: json };
};
