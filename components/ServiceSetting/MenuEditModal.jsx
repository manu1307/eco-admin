import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const MenuEditModalWrapper = styled.div``;
const MenuEditModalBackground = styled.div`
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

const MenuEditModalContainer = styled.div`
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
const MenuEditModalDescriptionInput = styled.textarea`
	border: 2px solid #00000038;
	height: 160px;
	@media screen and (max-width: 640px) {
		font-size: 10px;
		height: 150px;
	}
`;
const MenuEditModalItemInput = styled.input`
	border: 2px solid #00000038;
	@media screen and (max-width: 640px) {
		font-size: 10px;
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
const MenuFileInput = styled.input`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
`;
const MenuFileLabel = styled.label`
	position: relative;
	top: -40px;
	left: 380px;
	padding: 4px 6px;
	color: #999;
	font-size: 16px;
	line-height: normal;
	vertical-align: middle;
	background-color: #fdfdfd;
	cursor: pointer;
	border: 1px solid #ebebeb;
	border-bottom-color: #e2e2e2;
	border-radius: 0.25em;
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
const MenuEditModalItem = (props) => {
	const { label, type, placeholder, onChange, value } = props;

	return (
		<MenuEditModalItemContainer className='flex flex-col gap-2 items-center mt-3'>
			<MenuEditModalItemLabel className='w-full text-sm'>
				{label}
			</MenuEditModalItemLabel>
			{label === "메뉴 상세 설명" ? (
				<MenuEditModalDescriptionInput
					type={type}
					placeholder={placeholder}
					className='input-bordered rounded-xl w-full max-w-lg font-normal'
					onChange={onChange}
					value={value}
				/>
			) : (
				<MenuEditModalItemInput
					type={type}
					placeholder={placeholder}
					className='input-bordered rounded-xl w-full max-w-lg font-normal'
					onChange={onChange}
					value={value}
				/>
			)}
		</MenuEditModalItemContainer>
	);
};

export default function MenuEditModal(props) {
	const { open, data, menuId, changeOpen } = props;
	console.log(data);
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
			setMenuTagItem("");
			return;
		}

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

	const [menuName, setMenuName] = useState(data?.name);
	const [menuPrice, setMenuPrice] = useState(data?.price);
	const [menuDescription, setMenuDescription] = useState(data?.description);

	const [menuImage, setMenuImage] = useState(data?.imageUrl && data?.imageUrl);
	const [menuImageUrl, setMenuImageUrl] = useState(data?.imageUrl);

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	const getTagData = () => {
	// 		axios({
	// 			method: "get",
	// 			url: "https://ecomap.kr/api/v1/tags/type?type=menu",
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		}).then((res) => {
	// 			// console.log(res.data.data.content);
	// 			// setMenuTagList((prev) => [...prev, res.data.data]);
	// 		});
	// 	};
	// 	getTagData();
	// }, []);

	const EditMenu = () => {
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
		data.append("updateMenuInfoDto", blob);
		data.append("file", menuImage);

		axios({
			method: "put",
			url: `https://ecomap.kr/api/v1/menus/${menuId}`,
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

	const deleteMenu = (menuId) => {
		// console.log(menuId);
		const token = localStorage.getItem("token");

		axios({
			method: "delete",
			url: `https://ecomap.kr/api/v1/menus/${menuId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((Response) => {
			if (Response.status === 200) {
				clearModal();
				axios({
					method: "get",
					url: "https://ecomap.kr/api/v1/1/menus",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then(() => {
					changeOpen(() => {
						return false;
					});
				});
			} else {
				alert("오류가 생겼습니다. 다시 시도해주세요.");
			}
		});
	};
	const clearModal = () => {
		setMenuName("");
		setMenuPrice("");
		setMenuDescription("");
		setMenuImage();
		// setMenuSelectedImage("");
	};
	// console.log(menuImage);
	return (
		<MenuEditModalWrapper className={!open && "hidden"}>
			<MenuEditModalContainer>
				<div className='flex flex-col sm:flex-row gap-4 '>
					<MenuImageWrapper className='my-3 sm:m-0 w-full'>
						{menuImageUrl ? (
							<div className='w-full h-full'>
								<MenuImageContent
									style={{
										backgroundImage: `url(${menuImageUrl})`,
									}}></MenuImageContent>
								<div>
									<MenuFileLabel for='ex_file'>업로드</MenuFileLabel>
									<MenuFileInput
										type='file'
										id='ex_file'
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
								</div>
							</div>
						) : (
							<div className='w-full h-full flex justify-center items-center'>
								<label
									for='ex_file'
									className='flex gap-2 font-extrabold text-gray-400'>
									사진 업로드
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
								</label>
								<MenuFileInput
									type='file'
									id='ex_file'
									onChange={(event) => {
										console.log(event.target);
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
							</div>
						)}
					</MenuImageWrapper>
					<div className='flex my-3'></div>
					<div className='flex flex-col gap-5 w-full sm:w-2/5'>
						<MenuEditModalItem
							label='메뉴명'
							type='text'
							placeholder='ex. 아메리카노'
							value={menuName}
							onChange={(event) => {
								setMenuName(event.target.value);
							}}
						/>
						<MenuEditModalItem
							value={menuPrice}
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

						<MenuEditModalItem
							value={menuDescription}
							label='메뉴 상세 설명'
							type='text'
							placeholder='(선택사항)'
							onChange={(event) => {
								setMenuDescription(event.target.value);
							}}
						/>
					</div>
				</div>
				<MenuEditModalItemContainer className='flex flex-col items-start gap-3 mt-6'>
					<MenuEditModalItemLabel className='w-full text-sm'>
						메뉴 태그 (최대 2개)
					</MenuEditModalItemLabel>
					<MenuTagWrapper className='w-4/6 max-w-lg rounded-xl'>
						<div className='flex items-center w-full'>
							{menuTagList.map((tag, index) => {
								return (
									<MenuTagItem className='flex gap-1' key={index}>
										<div>{tag}</div>
										<button onClick={deleteItem}>X</button>
									</MenuTagItem>
								);
							})}
							<input
								type='text'
								placeholder='#태그 입력'
								className='input border-0 rounded-xl w-1/3 font-normal'
								value={menuTagItem}
								onChange={(event) => {
									setMenuTagItem(event.target.value);
								}}
								onKeyPress={onKeyPress}
							/>{" "}
						</div>
					</MenuTagWrapper>
					<div
						style={{ position: "relative", top: "-5px" }}
						className='text-gray-400 text-xs'>
						태그 입력 후 Enter
					</div>
				</MenuEditModalItemContainer>

				<div>
					<button
						type='button'
						onClick={() => {
							deleteMenu(menuId);
						}}
						className='text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						메뉴 삭제
					</button>
				</div>
				<div className='w-full flex'>
					<button
						type='button'
						onClick={EditMenu}
						className='w-1/2 text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
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
						className='w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						취소
					</button>{" "}
				</div>
			</MenuEditModalContainer>
			<MenuEditModalBackground
				onClick={() => {
					clearModal();
					changeOpen(() => {
						return false;
					});
				}}></MenuEditModalBackground>
		</MenuEditModalWrapper>
	);
}
