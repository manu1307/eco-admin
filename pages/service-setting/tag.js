import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useState } from "react";

const StoreRegisterModalItemContainer = styled.div`
	width: 100%;
`;
const StoreRegisterModalItemLabel = styled.label`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
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
	@media screen and (max-width: 640px) {
		font-size: 10px;
	}
`;
const MenuTagItemInput = styled.input`
	@media screen and (max-width: 640px) {
		font-size: 10px;
	}
`;
export default function MarketSettingTag() {
	const [menuTagItem, setMenuTagItem] = useState("");
	const [menuTagList, setMenuTagList] = useState([]);

	const submitTagItem = () => {
		if (menuTagList.length >= 3) {
			alert("태그는 최대 3개까지만 등록 가능합니다.");
			return;
		}

		const token = localStorage.getItem("token");

		// axios({
		//   method: "post",
		//   url: "https://ecomap.kr/api/v1/tags",
		//   headers: {
		//     "Content-Type": "application/json",
		//     Authorization: `Bearer ${token}`,
		//   },
		//   data: {
		//     type: "menu",
		//     name: menuTagItem,
		//   },
		// });
		setMenuTagList((prev) => {
			return [...prev, menuTagItem];
		});
		setMenuTagItem("");
	};
	const deleteItem = (event) => {
		const deleteTarget = event.target.parentElement.firstChild.innerText;
		const filteredTagList = menuTagList.filter((tag) => tag !== deleteTarget);
		setMenuTagList(filteredTagList);
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
				<div>태그 추가 하는 란</div>
				<div>
					<div>메뉴 태그</div>
					<div>매장 태그</div>
				</div>
				<div className='w-4/6 max-w-lg rounded-xl'>
					{menuTagList.map((tag, index) => {
						return (
							<MenuTagItem className='flex gap-1' key={index}>
								<div>{tag}</div>
								<button onClick={deleteItem}>X</button>
							</MenuTagItem>
						);
					})}
				</div>
			</StoreRegisterModalItemContainer>
		</Layout>
	);
}
