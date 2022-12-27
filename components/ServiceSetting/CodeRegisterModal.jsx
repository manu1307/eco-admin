import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentStoreState } from "../../states/global/globalState";

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
	@media screen and (max-width: 1920px) {
		top: 30px;
	}
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

export default function CodeRegisterModal({ open, changeOpen }) {
	const currentStore = useRecoilValue(currentStoreState);
	// console.log(currentStore);
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

	const [menuImage, setMenuImage] = useState("");
	const [menuImageUrl, setMenuImageUrl] = useState("");

	const [itemOffset, setItemOffset] = useState(0);

	const registerMenu = () => {
		const token = localStorage.getItem("token");
		console.log(currentStore.storeId);
		const menuData = {
			storeId: currentStore.storeId,
			name: menuName,
			price: parseInt(menuPrice),
			description: menuDescription ? menuDescription : null,
			orders: menuOrder,
			tagIds: [],
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
			if (response.status < 300) {
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
	// console.log(menuImage);
	return (
		<MenuRegisterModalWrapper className={!open && "hidden"}>
			<MenuRegisterModalContainer>
				<MenuRegisterModalFirstRow className='flex flex-col  sm:h-80 sm:flex-row gap-4 '>
					<div className='flex flex-col gap-5 w-full sm:w-2/5'>
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
