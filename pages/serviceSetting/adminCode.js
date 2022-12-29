import styled from "styled-components";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiBaseAddressState } from "../../states/global/globalState";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CodeRegisterModal from "../../components/ServiceSetting/CodeRegisterModal";
import CodeEditModal from "../../components/ServiceSetting/CodeEditModal";

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

	// const [codeDesc, setCodeDesc] = useState("");
	const [codeGroup, setCodeGroup] = useState();
	const [selectedGroup, setSelectedGroup] = useState("all");

	// 모달 관련 state
	const [codeRegisterModalOpen, setCodeRegisterModalOpen] = useState(false);
	const [codeEditModalOpen, setCodeEditModalOpen] = useState(false);
	const [editModalCodeData, setEditModalCodeData] = useState();
	const [editModalCodeId, setEditModalCodeId] = useState();

	const [codeList, setCodeList] = useState([]);
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
			const responseData = res.data.data;
			const set = new Set();
			responseData.map((code) => {
				set.add(code.group);
			});
			setCodeGroup([...set]);
		});
	}, [BASEURL, codeRegisterModalOpen]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const codeUrl =
			selectedGroup === "all"
				? `${BASEURL}/api/v1/codes`
				: `${BASEURL}/api/v1/codes/type?type=${selectedGroup}`;
		axios({
			method: "get",
			url: codeUrl,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			const responseData = res.data.data;
			setCodeList(responseData);
		});
		setLoginRole(localStorage.getItem("role"));
		axios({
			method: "get",
			url: `${BASEURL}/api/v1/codes/`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			console.log(res.data.data);
		});
	}, [BASEURL, codeRegisterModalOpen, selectedGroup, codeEditModalOpen]);

	//페이지네이션
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = codeList?.slice(itemOffset, endOffset);

	const pageCount = Math.ceil(codeList?.length / itemsPerPage);
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % menuData.length;
		setItemOffset(newOffset);
	};

	//수정 모달 열기
	const openEditModal = (data, id) => {
		setCodeEditModalOpen(true);
		setEditModalCodeData(data);
		setEditModalCodeId(id);
	};
	return (
		<Layout
			sideItems={[
				{ text: "단골 스탬프 설정", url: "/serviceSetting" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				loginRole === "admin" && {
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
					<div className='w-full mb-5'>
						<select
							className='border-2 border-gray-400 rounded-full'
							onChange={(event) => {
								setSelectedGroup(event.target.value);
							}}>
							<option value='all'>전체</option>
							{codeGroup?.map((code, index) => {
								return <option key={index}>{code}</option>;
							})}
						</select>
					</div>
					<CodeSettingBodyHeader className='flex justify-between px-5 items-center'>
						<div className='hidden sm:basis-1/12 sm:block'>Id</div>
						<div className='hidden sm:basis-1/12 sm:block'>그룹</div>
						<div className='basis-2/12'>코드</div>
						<div className='basis-2/12 sm:basis-1/12'>이름</div>
						<div className='basis-6/12 sm:basis-4/12'>description</div>
						<div className='hidden sm:basis-1/12 sm:block'>order.</div>
						<div className='hidden sm:basis-1/12 sm:block'>delYn</div>
						<button
							type='button'
							onClick={() => {
								setCodeRegisterModalOpen(true);
							}}
							className='text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center'>
							등록
						</button>
						{codeRegisterModalOpen && (
							<CodeRegisterModal
								open={codeRegisterModalOpen}
								changeOpen={setCodeRegisterModalOpen}
							/>
						)}
					</CodeSettingBodyHeader>
					{currentItems?.map((data, index) => {
						return (
							<CodeSettingBodyContent
								className='flex justify-between px-5'
								key={index}>
								<div className='hidden sm:basis-1/12 sm:block'>
									{selectedGroup === "all" ? data.shopCommonCodeId : data.id}
								</div>
								<div className='hidden sm:basis-1/12 sm:block'>
									{selectedGroup === "all" ? data.group : selectedGroup}
								</div>
								<div className='basis-2/12'>{data.code}</div>
								<div className='basis-2/12 sm:basis-1/12'>{data.name}</div>
								<div className='basis-6/12 sm:basis-4/12'>{data.desc}</div>
								<div className='hidden sm:basis-1/12 sm:block'>
									{data.orderNo}
								</div>
								<div className='hidden sm:basis-1/12 sm:block'></div>
								<button
									type='button'
									onClick={() => {
										openEditModal(data, data.shopCommonCodeId);
									}}
									className=' text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs sm:text-sm px-1 py-1 sm:px-5 sm:py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
									수정
								</button>
							</CodeSettingBodyContent>
						);
					})}
					{codeEditModalOpen && (
						<CodeEditModal
							open={codeEditModalOpen}
							codeId={editModalCodeId}
							data={editModalCodeData}
							changeOpen={setCodeEditModalOpen}
						/>
					)}
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
				</CodeSettingBody>
			</AdminPageContainer>
		</Layout>
	);
}
