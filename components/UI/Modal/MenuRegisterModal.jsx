import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
// import { TagsInput } from "react-tag-input-component";
import { WithContext as ReactTags } from "react-tag-input";

const MenuRegisterModalWrapper = styled.div`
	width: 90vw;
	height: 100vh;
	background-color: #80808073;
	position: absolute;
	top: 0;
	left: 0;
`;
const MenuRegisterModalContainer = styled.div`
	width: 800px;
	height: 800px;
	/* max-height: 500px; */
	padding: 10px;
	background-color: white;
	color: black;
	border-radius: 20px;
	position: relative;
	top: 10%;
	left: 10%;
`;
const MenuRegisterModalItemContainer = styled.div`
	width: 100%;
`;

const MenuRegisterModalItem = (props) => {
	const { label, type, placeholder, onChange } = props;

	return (
		<MenuRegisterModalItemContainer className='flex items-center mt-3'>
			<label className='w-2/6 text-sm'>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				className='input input-bordered rounded-xl w-5/6 max-w-xs'
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

	// const [menuTagType, setMenuTagType] = useState("");
	// const [menuTagName, setMenuTagName] = useState("");
	const [menuTag, setMenuTag] = useState([
		{ id: "ex)커피 맛집", text: "ex)커피 맛집" },
	]);

	const KeyCodes = {
		comma: 188,
		enter: 13,
	};

	const delimiters = [KeyCodes.comma, KeyCodes.enter];
	const handleDelete = (i) => {
		setMenuTag(menuTag.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setMenuTag([...menuTag, tag]);
		console.log(menuTag);
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
				name: tag.text,
			},
		});
	};

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = menuTag.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setMenuTag(newTags);
	};

	const handleTagClick = (index) => {
		console.log("The tag at index " + index + " was clicked");
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
				<MenuRegisterModalItem
					label='메뉴 상세 설명'
					type='text'
					placeholder='(선택사항)'
					onChange={(event) => {
						setMenuDescription(event.target.value);
					}}
				/>
				<MenuRegisterModalItem
					label='메뉴 노출 순서'
					type='text'
					placeholder='ex. 1순위 = 1'
					onChange={(event) => {
						setMenuOrder(event.target.value);
					}}
				/>
				<MenuRegisterModalItemContainer className='flex items-center mt-3'>
					<label className='w-2/6 text-sm'>태그</label>
					<div>
						<ReactTags
							tags={menuTag}
							delimiters={delimiters}
							handleDelete={handleDelete}
							handleAddition={handleAddition}
							handleDrag={handleDrag}
							handleTagClick={handleTagClick}
							inputFieldPosition='top'
							placeholder='태그를 입력해주세요'
							autocomplete
						/>
					</div>
					{/* <div>
						<pre>{JSON.stringify(menuTag)}</pre>
						<TagsInput
							value={menuTag}
							onChange={setMenuTag}
							placeHolder='태그를 입력해주세요'
						/>
						<em>태그를 추가하려면 enter 키를 누르세요</em>
					</div> */}
				</MenuRegisterModalItemContainer>
				<div className='my-5'>
					<label for='menu'>메뉴 사진 업로드</label>
					<input
						type='file'
						id='menu'
						name='menu'
						accept='image/png, image/jpeg'></input>
				</div>
				<button
					type='button'
					onClick={registerMenu}
					className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
					등록
				</button>
				<button
					type='button'
					onClick={() => {
						changeOpen(() => {
							return false;
						});
					}}
					className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
					취소
				</button>
			</MenuRegisterModalContainer>
		</MenuRegisterModalWrapper>
	);
}
