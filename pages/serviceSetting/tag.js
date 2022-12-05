import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SideBarOpenState } from "../../states/ServiceSetting/SideBarOpenState";
import BackgroundColor from "../../components/UI/Layout/BackgroundColor";
import axios from "axios";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import ReactPaginate from "react-paginate";
import TagRegisterModal from "../../components/UI/Modal/TagRegisterModal";
import { apiBaseAddressState } from "../../states/global/globalState";
import TagEditModal from "../../components/UI/Modal/TagEditModal";

const MenuSettingWrapper = styled.div`
  padding-top: 20px;
  width: 83.7%;
  background-color: #f6f6f6;
  padding-left: 50px;
  @media screen and (max-width: 640px) {
    width: 100%;
    padding: 10px;
    height: 90vh;
  }
  @media screen and (max-width: 1366px) {
  }
`;

const MenuSettingBody = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 90%;
  max-height: 900px;
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 0 0 2px 1.5px #d8d8d8;
  background-color: #fff;
  padding: 20px 20px;
`;

const MenuSettingBodyHeader = styled.div`
  width: 100%;
  border-radius: 15px;
  background-color: #242746;
  height: 70px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  @media screen and (max-width: 640px) {
    font-size: 12px;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
const MenuSettingBodyContent = styled.div`
  width: 100%;
  border-radius: 15px;
  background-color: #f5f5f5;
  height: 70px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  @media screen and (max-width: 640px) {
    font-size: 12px;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const EditButton = styled.div`
  @media screen and (max-width: 640px) {
    width: 15%;
  }
`;
const TagSelectBtn = styled.div`
  margin-top: 20px;
  max-width: 1280px;
  padding: 10px 10px;
  border-radius: 15px;
  box-shadow: 0 0 2px 1.5px #d8d8d8;
  background-color: #fff;
  font-weight: bold;
  cursor: pointer;

  :hover {
    background-color: #242746;
    color: white;
  }
  @media screen and (max-width: 500px) {
    padding: 10px;
    color: black;
  }
`;

const TagItem = (props) => {
  const {
    tagId,
    type,
    tagContent,
    status,
    tagData,
    handleTagEditModal,
    handleTagActivate,
  } = props;
  const BASEURL = useRecoilValue(apiBaseAddressState);

  const handleActivateTag = (id) => {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `${BASEURL}/api/v1/tags/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        axios({
          method: "get",
          url: `${BASEURL}/api/v1/tags`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          handleTagActivate(res.data);
        });
      }
    });
  };

  return (
    <MenuSettingBodyContent>
      <div className="w-1/6 text-center">{tagId}</div>
      <div className="w-1/6 text-center">{type}</div>
      <div className="w-2/6 text-center">{tagContent}</div>
      <div className="w-1/6 text-center">{status}</div>
      <EditButton className="w-1/6 flex justify-center">
        <button
          onClick={() => {
            handleTagEditModal(tagData, tagId);
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none   font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-4 sm:py-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          수정
        </button>
        {JSON.parse(status) ? (
          <button
            onClick={() => {
              handleActivateTag(tagId);
            }}
            type="button"
            className="text-white bg-green-500 hover:bg-green-800 focus:outline-none  font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-4 sm:py-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            활성화
          </button>
        ) : (
          <button
            onClick={() => {
              console.log(status);
              handleActivateTag(tagId);
            }}
            type="button"
            className="text-white bg-red-500 hover:bg-red-700 focus:outline-none   font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-4 sm:py-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            비활성화
          </button>
        )}
      </EditButton>
    </MenuSettingBodyContent>
  );
};

export default function ServiceSettingMenu() {
  const [sideBarOpen, setSideBarOpenState] = useRecoilState(SideBarOpenState);
  const BASEURL = useRecoilValue(apiBaseAddressState);

  const [tagRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [tagEditModalOpen, setEditModalOpen] = useState(false);

  const [tagType, setTagType] = useState("");
  const [tagItem, setTagItem] = useState("");

  const [tagList, setTagList] = useState();

  const [modalTagData, setModalTagData] = useState();
  const [modalDataTagId, setModalDataTagId] = useState();

  const currentPageTagList = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: `${BASEURL}/api/v1/tags`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTagList(response.data);
    });
  }, [BASEURL, tagRegisterModalOpen, tagEditModalOpen]);

  // 페이지네이션 관련

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = tagList?.slice(itemOffset, endOffset);
  currentPageTagList.current = currentItems;
  const pageCount = Math.ceil(tagList?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tagList.length;
    setItemOffset(newOffset);
  };

  const openEditModal = (data, tagId) => {
    setModalTagData(() => data);
    setModalDataTagId(tagId);
    setEditModalOpen((prev) => !prev);
  };

  return (
    <Layout
      sideItems={[
        { text: "텀블러 할인 설정", url: "" },
        { text: "단골 스탬프 설정", url: "" },
        { text: "단골 리스트", url: "" },
        { text: "메뉴 설정", url: "/serviceSetting/menu" },
        { text: "마감타임 설정", url: "/serviceSetting/closingsale" },
        { text: "알림 설정", url: "" },
        { text: "태그 설정", url: "/serviceSetting/tag" },
        { text: "댓글신고", url: "" },
      ]}
    >
      <MenuSettingWrapper className={sideBarOpen ? "z-0" : "z-10"}>
        <ContentHeader firstCategory="서비스 설정" secondCategory="태그 설정" />
        <MenuSettingBody className="flex flex-col items-center">
          <MenuSettingBodyHeader className="flex items-center">
            <div className="w-1/6 text-center">태그 Id</div>
            <div className="w-1/6 text-center">type</div>
            <div className="w-2/6 text-center">태그</div>
            <div className="w-1/6 text-center">상태</div>
            <EditButton className="w-1/6 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setRegisterModalOpen(true);
                }}
                className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center"
              >
                등록
              </button>
            </EditButton>
          </MenuSettingBodyHeader>
          {currentPageTagList.current?.map((tag) => {
            return (
              <TagItem
                key={tag.tagId}
                tagId={tag.tagId}
                type={tag.type}
                tagContent={tag.name}
                status={tag.status.toString()}
                tagData={tag}
                handleTagEditModal={openEditModal}
                handleTagActivate={setTagList}
                // handleTagEditModalData={getTagEditModalData}
              />
            );
          })}
          <div className="w-full mt-5 ">
            <ReactPaginate
              className="w-full flex gap-5 justify-center"
              breakLabel="..."
              nextLabel="다음 >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< 이전"
              renderOnZeroPageCount={null}
            />
          </div>
          {tagRegisterModalOpen && (
            <TagRegisterModal
              changeOpen={setRegisterModalOpen}
            ></TagRegisterModal>
          )}
          {tagEditModalOpen && (
            <TagEditModal
              changeOpen={setEditModalOpen}
              tagData={modalTagData}
            ></TagEditModal>
          )}
        </MenuSettingBody>
      </MenuSettingWrapper>
      <BackgroundColor />
    </Layout>
  );
}
