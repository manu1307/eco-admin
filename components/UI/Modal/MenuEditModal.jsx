import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const MenuEditModalWrapper = styled.div`
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
const MenuEditModalContainer = styled.div`
	width: 800px;
	height: 550px;
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
		height: 500px;
		margin: 0 auto;
		overflow-y: scroll;
	}
`;
const MenuEditModalItemContainer = styled.div`
	width: 100%;
`;
const MenuEditModalItemLabel = styled.label`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
`;
const MenuEditModalItemInput = styled.input`
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

const MenuEditModalItem = (props) => {
	const { label, type, value, placeholder, onChange } = props;

	return (
		<MenuEditModalItemContainer className='flex items-center mt-3'>
			<MenuEditModalItemLabel className='w-2/6 text-sm'>
				{label}
			</MenuEditModalItemLabel>
			<MenuEditModalItemInput
				type={type}
				value={value && value}
				placeholder={placeholder}
				className='input-bordered rounded-xl w-5/6 max-w-lg font-normal'
				onChange={onChange}
			/>
		</MenuEditModalItemContainer>
	);
};

export default function MenuEditModal(props) {
	const { data, changeOpen } = props;

	const [menuName, setMenuName] = useState(data.name);
	const [menuPrice, setMenuPrice] = useState(data.price);
	const [menuDescription, setMenuDescription] = useState("");
	const [menuOrder, setMenuOrder] = useState(data.id);

	const [menuTagList, setMenuTagList] = useState([]);

	const [menuImage, setMenuImage] = useState(
		data.imageUrl ? data.imageUrl : ""
	);
	const [menuSelectedImage, setMenuSelectedImage] = useState();

	const token = localStorage.getItem("token");

	useEffect(() => {
		axios({
			method: "get",
			url: "https://ecomap.kr/api/v1/menus/2 ",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			console.log(res);
		});
	}, [token]);

	const EditMenu = () => {
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
		data.append("updateMenuInfoDto", blob);
		data.append("file", menuImage);

		axios({
			method: "put",
			url: "https://ecomap.kr/api/v1/menus/2",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			data: data,
		}).then((Response) => {
			if (Response.status === 200) {
				clearModal();
				changeOpen(false);
			} else {
				alert("등록 오류가 생겼습니다. 다시 시도해주세요.");
			}
		});
	};

	const deleteMenu = () => {
		axios({
			method: "delete",
			url: "https://ecomap.kr/api/v1/menus/",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((Response) => {
			if (Response.status === 200) {
				clearModal();
				axios({
					method: "get",
					url: "https://ecomap.kr/api/v1/menus",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => {
					console.log(res.data);

					// setMenuData(res.data);
				});
			}
			// changeOpen(false);
			else {
				alert("오류가 생겼습니다. 다시 시도해주세요.");
			}
		});
	};
	const clearModal = () => {
		setMenuName("");
		setMenuPrice("");
		setMenuDescription("");
		setMenuOrder("");
		setMenuTagList([]);
		setMenuImage("");
		setMenuSelectedImage("");
	};
	return (
		<MenuEditModalWrapper>
			<MenuEditModalContainer>
				<div className='flex flex-col sm:flex-row gap-4 '>
					<div className='w-full sm:w-1/2'>
						<MenuEditModalItem
							label='메뉴명'
							type='text'
							value={menuName}
							placeholder='ex. 아메리카노'
							onChange={(event) => {
								setMenuName(event.target.value);
							}}
						/>
						<MenuEditModalItem
							label='메뉴 가격'
							type='number'
							value={menuPrice}
							placeholder='ex. 3000'
							onChange={(event) => {
								setMenuPrice(event.target.value);
							}}
						/>
						<MenuEditModalItem
							label='메뉴 상세 설명'
							type='text'
							value={menuDescription}
							placeholder='(선택사항)'
							onChange={(event) => {
								setMenuDescription(event.target.value);
							}}
						/>
						<MenuEditModalItem
							label='메뉴 노출 순서'
							type='text'
							value={menuOrder}
							placeholder='ex. 1순위 = 1'
							onChange={(event) => {
								setMenuOrder(event.target.value);
							}}
						/>
					</div>

					<div className=' my-3 sm:m-0  w-full sm:w-1/2'>
						{menuImage ? (
							<Image
								className='rounded-xl'
								src={menuImage}
								width={500}
								height={300}
								alt='image'
							/>
						) : (
							<div className='w-full text-slate-300 text-center'>
								이미지 미리 보기 칸
							</div>
						)}
					</div>
				</div>
				<MenuEditModalItemContainer className='flex items-center mt-3'>
					<MenuEditModalItemLabel className='w-2/6 text-sm'>
						메뉴 태그 (최대 3개)
					</MenuEditModalItemLabel>
					<div>
						<div className='w-full flex flex-wrap gap-2 max-w-lg rounded-xl mb-3 sm:h-5'>
							{menuTagList?.map((tag, index) => {
								return (
									<MenuTagSelected
										className='flex items-center gap-1 text-sm'
										key={index}>
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
											}}>
											×
										</button>
									</MenuTagSelected>
								);
							})}
						</div>
						<div className='w-full flex flex-wrap gap-2 max-w-lg rounded-xl'>
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
										className='flex gap-1 text-sm'
										key={index}>
										<div>#{tag}</div>
									</MenuTagItemButton>
								);
							})}
						</div>
					</div>
				</MenuEditModalItemContainer>
				<div className='my-3'>
					<MenuEditModalItemLabel
						className='block mb-2 text-sm  text-gray-900 dark:text-gray-300'
						htmlFor='file_input'>
						매장 사진 업로드
					</MenuEditModalItemLabel>
					<input
						className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
						id='file_input'
						type='file'
						onChange={(event) => {
							let reader = new FileReader();
							if (event.target.files[0]) {
								setMenuSelectedImage(event.target.files[0]);
								reader.readAsDataURL(event.target.files[0]);
							}
							reader.onloadend = () => {
								const resultImage = reader.result;
								setMenuImage(resultImage);
							};
						}}
					/>
				</div>
				<div>
					<button
						type='button'
						onClick={deleteMenu}
						className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						메뉴 삭제
					</button>
				</div>
				<button
					type='button'
					onClick={EditMenu}
					className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
					수정
				</button>
				<button
					type='button'
					onClick={() => {
						clearModal();
						changeOpen(() => {
							return false;
						});
					}}
					className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
					취소
				</button>
			</MenuEditModalContainer>
		</MenuEditModalWrapper>
	);
}
