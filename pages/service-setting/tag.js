import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const StoreRegisterModalItemContainer = styled.div`
	width: 100%;
`;
const TagInputContainer = styled.div`
	width: 100%;
	padding: 20px 0 0 20px;
`;

const TagListContainer = styled.div`
	width: 100%;
	padding: 20px 0 0 20px;
`;
const MenuTagListContainer = styled.div`
	width: 100%;
	margin: 0 0 20px 0;
`;
const StoreTagListContainer = styled.div`
	width: 100%;
	margin: 0 0 20px 0;
`;
const TagItemInput = styled.input`
	/* padding: 5px 5px; */
	font-weight: 400;
	color: black;
	background-color: white;

	:focus {
		outline: none;
		border: none;
	}
`;
const MenuTagItem = styled.div`
	border: none;
`;

const MenuTagItemContainer = (props) => {
	const { type, tag, reloadMenuTag, reloadStoreTag } = props;
	const [editing, setEditing] = useState(false);
	const menuTagItem = useRef("");
	const getMenuTagItemList = (token) => {
		axios({
			method: "get",
			url: "https://ecomap.kr/api/v1/tags/type?type=menu",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				reloadMenuTag(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getStoreTagItemList = (token) => {
		axios({
			method: "get",
			url: "https://ecomap.kr/api/v1/tags/type?type=store",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				reloadStoreTag(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const editMenuTagItem = (event, tagId) => {
		if (event.key === "Enter") {
			if (!event.target.value) {
				alert("태그를 입력해주십시오");
				return;
			}
			const token = localStorage.getItem("token");
			menuTagItem.current = event.target.value;

			const tagData = {
				type: type,
				name: menuTagItem.current,
			};

			axios({
				method: "put",
				url: `https://ecomap.kr/api/v1/tags/${tagId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: tagData,
			})
				.then((response) => {
					console.log(response);
					setEditing((prev) => !prev);
					if (type === "menu") {
						getMenuTagItemList(token);
					} else if (type === "store") {
						getStoreTagItemList(token);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return (
		<MenuTagItem className='w-fit flex gap-3 p-1 rounded-xl bg-slate-200'>
			{editing ? (
				<TagItemInput
					className='p-1 '
					disabled={!editing}
					onKeyPress={(event) => {
						editMenuTagItem(event, tag.tagId);
					}}
				/>
			) : (
				<>
					<div className='p-1'>{tag.name}</div>{" "}
					<button
						className='bg-slate-300 p-1 rounded-lg hover:bg-slate-400'
						onClick={() => {
							setEditing((prev) => !prev);
							// editItem(tag.tagId);
						}}>
						{!editing && "수정"}
					</button>
				</>
			)}
		</MenuTagItem>
	);
};

export default function MarketSettingTag() {
	const [tagType, setTagType] = useState("");
	const [tagItem, setTagItem] = useState("");

	const [menuTagList, setMenuTagList] = useState([]);

	const [storeTagList, setStoreTagList] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		getMenuTagItemList(token);
		getStoreTagItemList(token);
	}, []);
	const getMenuTagItemList = (token) => {
		axios({
			method: "get",
			url: "https://ecomap.kr/api/v1/tags/type?type=menu",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setMenuTagList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getStoreTagItemList = (token) => {
		axios({
			method: "get",
			url: "https://ecomap.kr/api/v1/tags/type?type=store",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log(response);
				setStoreTagList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const submitTagItem = () => {
		if (tagType && tagItem) {
			const token = localStorage.getItem("token");
			const tagData = {
				type: tagType,
				name: tagItem,
			};
			axios({
				method: "post",
				url: "https://ecomap.kr/api/v1/tags",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: tagData,
			}).then((response) => {
				getMenuTagItemList(token);
				getStoreTagItemList(token);
				setTagItem("");
			});
		} else {
			alert("올바른 태그를 입력해주세요");
		}
	};

	return (
		<Layout
			sideItems={[
				{ text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "" },
				{ text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/service-setting/menu" },
				{ text: "마감타임 설정", url: "/service-setting/closingsale" },
				{ text: "알림 설정", url: "" },
				{ text: "태그 설정", url: "/service-setting/tag" },
				{ text: "댓글신고", url: "" },
			]}>
			<StoreRegisterModalItemContainer className='flex flex-col items-start mt-3'>
				<TagInputContainer>
					<select
						className='rounded-xl mr-5'
						defaultValue='none'
						onChange={(event) => {
							console.log(event.target.value);
							setTagType(event.target.value);
						}}>
						<option value='none'>태그 종류</option>
						<option value='menu'>메뉴</option>
						<option value='store'>매장</option>
					</select>
					<input
						className='rounded-xl mr-5 w-80'
						type='text'
						value={tagItem}
						placeholder='태그를 입력해주세요'
						onChange={(event) => {
							setTagItem(event.target.value);
						}}
					/>
					<button
						type='button'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={submitTagItem}>
						태그 등록
					</button>
				</TagInputContainer>
				<TagListContainer>
					<MenuTagListContainer>
						메뉴 태그{" "}
						<div className='flex gap-3 flex-wrap marker:w-full max-w-5xl rounded-xl mt-3'>
							{menuTagList.map((tag, index) => {
								return (
									<MenuTagItemContainer
										key={index}
										tag={tag}
										reloadMenuTag={setMenuTagList}
										reloadStoreTag={setStoreTagList}
										type='menu'
									/>
								);
							})}
						</div>
					</MenuTagListContainer>
					<StoreTagListContainer>
						매장 태그{" "}
						<div className='flex gap-3 flex-wrap marker:w-full max-w-5xl rounded-xl mt-3'>
							{storeTagList.map((tag, index) => {
								return (
									<MenuTagItemContainer
										key={index}
										tag={tag}
										reloadMenuTag={setMenuTagList}
										reloadStoreTag={setStoreTagList}
										type='store'
									/>
								);
							})}
						</div>
					</StoreTagListContainer>
				</TagListContainer>
			</StoreRegisterModalItemContainer>
		</Layout>
	);
}
