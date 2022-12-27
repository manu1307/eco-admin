import styled from "styled-components";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiBaseAddressState } from "../../states/global/globalState";
import axios from "axios";
import ReactPaginate from "react-paginate";

const AdminPageContainer = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 28px;
	@media screen and (max-width: 640px) {
		width: 100%;
		padding: 10px;
		height: 90vh;
	}
`;

const CodeSettingBody = styled.div`
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

const CodeSettingBodyHeader = styled.div`
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
const CodeSettingBodyContent = styled.div`
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
	width: 10%;
	@media screen and (max-width: 640px) {
		width: 15%;
	}
`;

export default function AdminCode() {
	const [loginRole, setLoginRole] = useState("");
	const [adminCode, setAdminCode] = useState();
	const BASEURL = useRecoilValue(apiBaseAddressState);

	// const [codeName, setCodeName] = useState("");
	// const [codeDesc, setCodeDesc] = useState("");
	// const [codeGroup, setCodeGroup] = useState("");

	const [codeList, setCodeList] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setLoginRole(localStorage.getItem("role"));
		axios({
			method: "get",
			url: `${BASEURL}/api/v1/codes`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			setCodeList(res.data.data);
		});
	}, [BASEURL]);

	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = codeList?.slice(itemOffset, endOffset);

	const pageCount = Math.ceil(codeList?.length / itemsPerPage);

	const registerCode = () => {
		const token = localStorage.getItem("token");
		axios({
			method: "post",
			url: `${BASEURL}/api/v1/codes`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				name: codeName,
				desc: codeDesc,
				group: codeGroup,
			},
		}).then((res) => console.log(res.data));
	};

	return (
		<Layout
			sideItems={[
				{ text: "단골 스탬프 설정", url: "/serviceSetting" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				{
					text: "관리자",
					url: "/serviceSetting/admin",
				},
				loginRole === "admin" && {
					text: "코드 설정",
					url: "/serviceSetting/adminCode",
				},
			]}>
			<AdminPageContainer>
				<ContentHeader
					firstCategory='서비스 설정'
					secondCategory='관리자 코드 설정'
				/>
				<CodeSettingBody className='flex flex-col items-center'>
					<CodeSettingBodyHeader className='flex justify-between px-5 items-center'>
						<div>그룹</div>
						<div>코드</div>
						<div>이름</div>
						<div>description</div>
						<div>order.</div>
						<div>delYn</div>
						<button
							type='button'
							onClick={() => {
								setMenuRegisterModalOpen(true);
							}}
							className='text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center'>
							등록
						</button>
						{/* {menuRegisterModalOpen && (
								<MenuRegisterModal
									open={menuRegisterModalOpen}
									changeOpen={setMenuRegisterModalOpen}
									tagData={tagData}
								/>
							)} */}
					</CodeSettingBodyHeader>
					{currentItems?.map((data, index) => {
						return (
							<CodeSettingBodyContent key={index}>
								<div>
									<input type='checkbox' />
								</div>
								{/* <div>{data.menuId && data.menuId}</div>
								<div>{data.name}</div>
								<div>{data.price}원</div>{" "}
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
												console.log(res.data.data);
												openModal(res.data.data, data.menuId);
											});
										}}
										type='button'
										className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
										수정
									</button>
								</EditButton> */}
							</CodeSettingBodyContent>
						);
					})}
					{/* {menuEditModalOpen && (
						<MenuEditModal
							open={menuEditModalOpen}
							menuId={modalDataMenuId}
							data={modalData}
							changeOpen={setMenuEditModalOpen}
						/>
					)} */}
					<div className='w-full mt-5 '>
						<ReactPaginate
							className='w-full flex gap-5 justify-center'
							breakLabel='...'
							nextLabel='다음 >'
							// onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							// pageCount={pageCount}
							previousLabel='< 이전'
							renderOnZeroPageCount={null}
						/>
					</div>
				</CodeSettingBody>
			</AdminPageContainer>
		</Layout>
	);
}
