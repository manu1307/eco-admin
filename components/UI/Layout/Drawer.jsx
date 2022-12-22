import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	apiBaseAddressState,
	currentStoreState,
	storeListState,
} from "../../../states/global/globalState";
import { SideBarOpenState } from "../../../states/ServiceSetting/SideBarOpenState";

const ToggleButton = styled.label`
	background-color: #072f53;
	border: none;
`;
const DropdownWrapper = styled.div`
	width: 100%;
`;
const SelectWrapper = styled.select`
	width: 100%;
	height: 50px;
	font-size: 20px;
	color: black;
	font-weight: 700;
	border-color: #b8b8b8;
	border-radius: 10px;

	&:focus {
		box-sizing: border-box;
		outline: 0;
	}
`;
const SelectOption = styled.option`
	padding: 5px 10px;
	color: black;
	font-weight: 700;
`;

export default function Drawer() {
	const [sideBarOpen, setSideBarOpen] = useRecoilState(SideBarOpenState);
	const [storeList, setStoreList] = useRecoilState(storeListState);
	const [currentStore, setCurrentStore] = useRecoilState(currentStoreState);

	const BASEURL = useRecoilValue(apiBaseAddressState);

	useEffect(() => {
		const token = localStorage.getItem("token");
		axios({
			method: "get",
			url: `${BASEURL}/api/v1/stores`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			// console.log(res.data.data);
			setStoreList(res.data.data);
			!currentStore && setCurrentStore([res.data.data[0]]);
		});
	}, [BASEURL, setStoreList, currentStore, setCurrentStore]);

	const DrawerMenu = [
		{
			bname: "대시보드",
			bnameURL: "/dashboard",
		},
		{
			bname: "매장 설정",
			bnameURL: "/storeSetting",
			detail: [{ name: "매장 등록", url: "/storeSetting/register" }],
		},
		{
			bname: "매장 관리",
			bnameURL: "/storeManage",
			detail: [{ name: "qr 코드", url: "/storeManage/qrCode" }],
		},
		{
			bname: "서비스 설정",
			bnameURL: "/serviceSetting",
			detail: [
				{ name: "메뉴 설정", url: "/serviceSetting/menu" },
				{ name: "마감 할인 설정", url: "/serviceSetting/closingsale" },
				{ name: "태그 설정", url: "/serviceSetting/tag" },
			],
		},
	];
	return (
		<div className='drawer'>
			<input
				id='my-drawer'
				type='checkbox'
				className='drawer-toggle'
				onChange={() => {
					if (sideBarOpen === true) {
						setTimeout(() => {
							setSideBarOpen((prev) => !prev);
						}, 500);
					} else {
						setSideBarOpen((prev) => {
							return !prev;
						});
					}
				}}
			/>
			<div className='drawer-content z-10'>
				<ToggleButton
					htmlFor='my-drawer'
					className='btn drawer-button z-20'
					// onClick={}
				>
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
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				</ToggleButton>
			</div>
			<div className='drawer-side'>
				<label htmlFor='my-drawer' className='drawer-overlay z-10'></label>

				<ul className='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
					<DropdownWrapper>
						<SelectWrapper
							onChange={(event) => {
								const selectedStore = storeList.filter(
									(store) => store.name == event.target.value
								);
								setCurrentStore(selectedStore);
								localStorage.setItem("storeId", selectedStore[0].storeId);
							}}>
							{storeList.length > 0 ? (
								storeList.map((store, index) => {
									const selected = store.name == currentStore[0].name;
									return (
										<SelectOption
											key={index}
											onChange={(event) => {
												setCurrentStore(event.target.value);
											}}
											selected={selected}>
											{store.name}
										</SelectOption>
									);
								})
							) : (
								<SelectOption>가게를 등록해주세요.</SelectOption>
							)}
						</SelectWrapper>
					</DropdownWrapper>
					{DrawerMenu.map((menuItem, index) => {
						return (
							<li key={index}>
								<Link href={menuItem.bnameURL}>
									<a>{menuItem.bname}</a>
								</Link>
								{menuItem.detail?.map((detailMenu, index) => {
									return (
										<Link key={index} href={detailMenu.url}>
											<a className='indent-2'>- {detailMenu.name}</a>
										</Link>
									);
								})}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
