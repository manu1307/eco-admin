import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import MenuEditModal from "../../components/UI/Modal/MenuEditModal";
import { useRecoilState } from "recoil";
import { SideBarOpenState } from "../../states/ServiceSetting/SideBarOpenState";
import MenuRegisterModal from "../../components/UI/Modal/MenuRegisterModal";
import axios from "axios";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import ReactPaginate from "react-paginate";

const MenuSettingWrapper = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 28px;
	@media screen and (max-width: 640px) {
		width: 100%;
		padding: 10px;
		height: 90vh;
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
const CheckContent = styled.div`
	width: 10%;
	text-align: center;
`;
const NumberContent = styled.div`
	width: 10%;
	text-align: center;
`;
const MenuContent = styled.div`
	width: 30%;
	@media screen and (max-width: 640px) {
		width: 35%;
	}
`;
const PriceContent = styled.div`
	width: 40%;
	@media screen and (max-width: 640px) {
		width: 30%;
	}
`;
const EditButton = styled.div`
	width: 10%;
	@media screen and (max-width: 640px) {
		width: 15%;
	}
`;

export default function ServiceSettingMenu() {
	const [menuData, setMenuData] = useState();
	const [tagData, setTagData] = useState();

	const currentPageMenuData = useRef();

	const [menuEditModalOpen, setMenuEditModalOpen] = useState(false);
	const [modalData, setModalData] = useState();
	const [modalDataMenuId, setModalDataMenuId] = useState();
	const [menuRegisterModalOpen, setMenuRegisterModalOpen] = useState(false);

	const [sideBarOpen, setSideBarOpenState] = useRecoilState(SideBarOpenState);

	useEffect(() => {
		const token = localStorage.getItem("token");

		const getMenuData = () => {
			axios({
				method: "get",
				url: "https://ecomap.kr/api/v1/1/menus",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				console.log(res.data);
				setMenuData(res.data);
			});
		};

		getMenuData();
	}, [menuRegisterModalOpen, menuEditModalOpen]);

	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 5;
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = menuData?.slice(itemOffset, endOffset);
	currentPageMenuData.current = currentItems;
	const pageCount = Math.ceil(menuData?.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % menuData.length;
		setItemOffset(newOffset);
	};

	const openModal = (data, menuId) => {
		setModalData(() => {
			return data;
		});
		setModalDataMenuId(menuId);
		setMenuEditModalOpen((prev) => !prev);
	};

	return (
		<Layout
			sideItems={[
				// { text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "/serviceSetting" },
				// { text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				// { text: "알림 설정", url: "" },
				{ text: "태그 설정", url: "/serviceSetting/tag" },
				// { text: "댓글신고", url: "" },
			]}>
			<MenuSettingWrapper className={sideBarOpen ? "z-0" : "z-10"}>
				<ContentHeader firstCategory='서비스 설정' secondCategory='메뉴 설정' />
				<MenuSettingBody className='flex flex-col items-center'>
					<MenuSettingBodyHeader className='flex items-center'>
						<CheckContent>Check</CheckContent>
						<NumberContent>No.</NumberContent>
						<MenuContent>메뉴명</MenuContent>
						<PriceContent>가격</PriceContent>
						<EditButton>
							<button
								type='button'
								onClick={() => {
									setMenuRegisterModalOpen(true);
								}}
								className='text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center'>
								등록
							</button>
							<MenuRegisterModal
								open={menuRegisterModalOpen}
								changeOpen={setMenuRegisterModalOpen}
								tagData={tagData}
							/>
						</EditButton>
					</MenuSettingBodyHeader>
					{currentPageMenuData.current?.map((data, index) => {
						return (
							<MenuSettingBodyContent key={index}>
								<CheckContent>
									<input type='checkbox' />
								</CheckContent>
								<NumberContent>{data.menuId && data.menuId}</NumberContent>
								<MenuContent>{data.name}</MenuContent>
								<PriceContent>{data.price}원</PriceContent>{" "}
								<EditButton>
									<button
										onClick={() => {
											const token = localStorage.getItem("token");
											axios({
												method: "get",
												url: `https://ecomap.kr/api/v1/menus/${data.menuId}`,
												headers: {
													Authorization: `Bearer ${token}`,
												},
											}).then((res) => {
												openModal(res.data, data.menuId);
											});
										}}
										type='button'
										className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
										수정
									</button>
								</EditButton>
							</MenuSettingBodyContent>
						);
					})}
					<div className='w-full mt-5 '>
						<ReactPaginate
							className='w-full flex gap-5 justify-center'
							breakLabel='...'
							nextLabel='다음 >'
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							pageCount={pageCount}
							previousLabel='< 이전'
							renderOnZeroPageCount={null}
						/>
					</div>
					{menuEditModalOpen && (
						<MenuEditModal
							menuId={modalDataMenuId}
							data={modalData}
							changeOpen={setMenuEditModalOpen}></MenuEditModal>
					)}
				</MenuSettingBody>
			</MenuSettingWrapper>
		</Layout>
	);
}
