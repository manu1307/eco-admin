import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentStoreState } from "../../../states/global/globalState";

const MenuRegisterModalWrapper = styled.div``;
const MenuRegisterModalBackground = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;

	@media screen and (max-width: 640px) {
		width: 100vw;
	}
`;
const MenuRegisterModalContainer = styled.div`
	width: 800px;
	/* height: 600px; */
	overflow-y: clip;
	padding: 25px;
	background-color: white;
	color: black;
	border-radius: 20px;
	position: absolute;
	top: 100px;
	left: 200px;
	z-index: 3;
	@media screen and (max-width: 1140px) {
		height: 90vh;
	}
	@media screen and (max-width: 640px) {
		width: 90%;
		top: 20px;
		left: 5%;
		position: absolute;
		padding: 15px;
		height: 700px;
		margin: 0 auto;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
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
const MenuRegisterModalDescriptionInput = styled.textarea`
	border: 2px solid #00000038;
	height: 160px;
	@media screen and (max-width: 640px) {
		font-size: 10px;
		height: 150px;
	}
`;
const MenuRegisterModalFirstRow = styled.div`
	height: 450px;
	@media screen and (max-width: 640px) {
		height: 100%;
	}
`;

const MenuImageWrapper = styled.div`
	width: 450px;
	height: 450px;
	border: 2px solid #bfbfbf;
	border-radius: 20px;
	margin: 0;
	@media screen and (max-width: 640px) {
		width: 100%;
		height: 300px;
	}
`;
const MenuImageContent = styled.div`
	box-sizing: content-box;
	width: 450px;
	height: 450px;
	border-radius: 20px;
	border: 2px solid #bfbfbf;
	background-repeat: no-repeat;
	background-size: cover;
	margin: -2px;
	@media screen and (max-width: 640px) {
		width: 100%;
		height: 300px;
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
		<MenuRegisterModalItemContainer className='flex flex-col gap-2 items-center mt-3'>
			<MenuRegisterModalItemLabel className='w-full text-sm'>
				{label}
			</MenuRegisterModalItemLabel>
			{label === "메뉴 상세 설명" ? (
				<MenuRegisterModalDescriptionInput
					type={type}
					placeholder={placeholder}
					className='input-bordered rounded-xl w-full max-w-lg font-normal'
					onChange={onChange}
				/>
			) : (
				<MenuRegisterModalItemInput
					type={type}
					placeholder={placeholder}
					className='input-bordered rounded-xl w-full max-w-lg font-normal'
					onChange={onChange}
				/>
			)}
		</MenuRegisterModalItemContainer>
	);
};

export default function MenuRegisterModal({ open, changeOpen }) {
	const currentStore = useRecoilValue(currentStoreState);
	const [menuName, setMenuName] = useState("");
	const [menuPrice, setMenuPrice] = useState("");
	const [menuDescription, setMenuDescription] = useState("");
	const [menuOrder, setMenuOrder] = useState("");

	const [menuTagList, setMenuTagList] = useState([]);

	const [selectedMenuTagIdList, setSelectedMenuTagIdList] = useState([]);
	const [selectedMenuTagList, setSelectedMenuTagList] = useState([]);

	const [menuImage, setMenuImage] = useState("");
	const [menuImageUrl, setMenuImageUrl] = useState("");

	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const getTagData = () => {
			axios({
				method: "get",
				url: "https://ecomap.kr/api/v1/tags/type?type=menu",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setMenuTagList(res.data.data);
			});
		};
		getTagData();
	}, []);

	const registerMenu = () => {
		const token = localStorage.getItem("token");
		console.log(currentStore[0].storeId);
		const menuData = {
			storeId: currentStore[0].storeId,
			name: menuName,
			price: parseInt(menuPrice),
			description: menuDescription ? menuDescription : null,
			orders: menuOrder,
			tagIds: selectedMenuTagIdList,
		};
		console.log(menuData);
		const json = JSON.stringify(menuData);
		const blob = new Blob([json], {
			type: "application/json",
		});
		const data = new FormData();
		data.append("createMenuRequest", blob);
		data.append("file", menuImage);

		axios({
			method: "post",
			url: "https://ecomap.kr/api/v1/menus",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			data: data,
		}).then((response) => {
			if (response.status === 200) {
				clearModal();
				changeOpen(false);
				console.log("메뉴 등록 되었습니다.");
			} else {
				console.log(response);
				alert("등록 오류가 생겼습니다. 다시 시도해주세요.");
			}
		});
	};
	const clearModal = () => {
		setMenuName("");
		setMenuPrice("");
		setMenuDescription("");
		setMenuOrder("");
		setMenuImage("");
		setMenuImageUrl("");
	};
	return (
		<MenuRegisterModalWrapper className={!open && "hidden"}>
			<MenuRegisterModalContainer>
				<MenuRegisterModalFirstRow className='flex flex-col h-80 sm:flex-row gap-4 '>
					<MenuImageWrapper className='my-3 sm:m-0 w-full'>
						{menuImage ? (
							<MenuImageContent
								style={{
									backgroundImage: `url(${menuImageUrl})`,
								}}></MenuImageContent>
						) : (
							<div className='flex items-center h-full  w-full text-slate-300 text-center'>
								<MenuRegisterModalItemLabel
									className='flex gap-3 items-center justify-center w-full mb-2 text-sm  text-gray-900 dark:text-gray-300'
									htmlFor='file_input'>
									메뉴 사진
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
										/>
									</svg>
								</MenuRegisterModalItemLabel>{" "}
							</div>
						)}
					</MenuImageWrapper>
					<div className='flex flex-col gap-5 w-full sm:w-2/5'>
						<MenuRegisterModalItem
							label='메뉴명'
							type='text'
							placeholder='ex. 아메리카노'
							onChange={(event) => {
								setMenuName(event.target.value);
							}}
						/>
						<MenuRegisterModalItem
							label='메뉴 가격'
							type='number'
							placeholder='ex. 3000'
							onChange={(event) => {
								setMenuPrice(event.target.value);
							}}
						/>
						<label className='inline-flex relative items-center cursor-pointer'>
							<input
								type='checkbox'
								defaultValue=''
								className='sr-only peer'
								defaultChecked=''
							/>
							<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
							<span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
								마감타임 세일
							</span>
						</label>

						<MenuRegisterModalItem
							label='메뉴 상세 설명'
							type='text'
							placeholder='(선택사항)'
							onChange={(event) => {
								setMenuDescription(event.target.value);
							}}
						/>
					</div>
				</MenuRegisterModalFirstRow>

				<MenuRegisterModalItemContainer className='flex flex-col items-start gap-3 mt-6'>
					<MenuRegisterModalItemLabel className='w-full text-sm'>
						메뉴 태그 (최대 2개)
					</MenuRegisterModalItemLabel>
					<div>
						<div className='w-full flex flex-wrap gap-2 max-w-lg rounded-xl mb-3 sm:h-5'>
							{selectedMenuTagList.map((tag, i) => {
								return (
									<MenuTagSelected className='text-sm' key={i}>
										#{tag}
										<button
											onClick={() => {
												const filteredList = selectedMenuTagList.filter(
													(selectedTag) => {
														return selectedTag !== tag;
													}
												);
												setSelectedMenuTagList(filteredList);
											}}>
											×
										</button>
									</MenuTagSelected>
								);
							})}
						</div>
						<div className='w-full flex flex-wrap gap-2 max-w-lg rounded-xl mb-3 sm:h-5'>
							{menuTagList?.map((tag, i) => {
								return (
									<MenuTagItemButton
										className='text-sm'
										key={i}
										onClick={() => {
											if (selectedMenuTagList.length < 2) {
												setSelectedMenuTagIdList((prev) => {
													return [...prev, tag.tagId];
												});
												setSelectedMenuTagList((prev) => {
													return [...prev, tag.name];
												});
											} else {
												alert("태그는 2개까지만 선택 가능합니다.");
											}
										}}>
										#{tag.name}
									</MenuTagItemButton>
								);
							})}
						</div>
					</div>
				</MenuRegisterModalItemContainer>
				<div className='flex my-3'>
					<form>
						<input
							className='hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
							id='file_input'
							type='file'
							onChange={(event) => {
								let reader = new FileReader();
								if (event.target.files[0]) {
									setMenuImage(event.target.files[0]);
									reader.readAsDataURL(event.target.files[0]);
								}
								reader.onloadend = () => {
									const resultImage = reader.result;
									setMenuImageUrl(resultImage);
								};
							}}
						/>
					</form>
				</div>
				<div className='w-full flex'>
					<button
						type='button'
						onClick={registerMenu}
						className='w-1/2 text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						등록
					</button>
					<button
						type='button'
						onClick={() => {
							clearModal();
							changeOpen(() => {
								return false;
							});
						}}
						className='w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						취소
					</button>
				</div>
			</MenuRegisterModalContainer>
			<MenuRegisterModalBackground
				onClick={() => {
					clearModal();
					changeOpen(() => {
						return false;
					});
				}}
			/>
		</MenuRegisterModalWrapper>
	);
}
