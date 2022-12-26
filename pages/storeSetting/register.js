import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/UI/Layout/Layout";
import Image from "next/image";
import styled from "styled-components";
import Postcode from "../../components/MarketSetting/PostCode";
import AddressSearchModal from "../../components/UI/Modal/AddressSearchModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeAddrState } from "../../states/StoreSetting/storeAddressState";
import {
	apiBaseAddressState,
	storeListState,
} from "../../states/global/globalState";
import DayInput from "../../components/StoreSetting/DayInput";

const StoreOpenTime = [
	{ day: "월요일", openTime: "", closeTime: "" },
	{ day: "화요일", openTime: "", closeTime: "" },
	{ day: "수요일", openTime: "", closeTime: "" },
	{ day: "목요일", openTime: "", closeTime: "" },
	{ day: "금요일", openTime: "", closeTime: "" },
	{ day: "토요일", openTime: "", closeTime: "" },
	{ day: "일요일", openTime: "", closeTime: "" },
];

const StoreSettingContainer = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 28px;
	background-color: #f6f6f6;
`;

const StoreRegisterModalItemContainer = styled.div`
	width: 100%;
`;
const StoreRegisterModalItemLabel = styled.div`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
`;

const StoreImageRegister = styled.label`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
`;
const StoreTagWrapper = styled.div`
	border: 2px solid #00000038;
`;

const StoreTagItem = styled.div`
	margin: 0 5px;
	font-size: 15px;
	font-weight: 400;
	background-color: #dedede;
	padding: 2px 4px;
	border-radius: 5px;
`;
const TagInstruction = styled.div`
	position: relative;
	top: -10px;
`;

export default function MarketSetting() {
	const BASEURL = useRecoilValue(apiBaseAddressState);

	const [storeName, setStoreName] = useState("");
	const [storePhoneNumber, setStorePhoneNumber] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeImage, setStoreImage] = useState([]);

	const storeAddressData = useRecoilValue(storeAddrState);
	const [storeAddressDetail, setStoreAddressDetail] = useState("");

	const [storeList, setStoreList] = useRecoilState(storeListState);

	const [addressSearchModalOpen, setAddressSearchModalOpen] = useState(false);

	// 태그 설정
	const [storeTagItem, setStoreTagItem] = useState("");
	const [storeTagList, setStoreTagList] = useState([]);

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

		setStoreTagList((prev) => {
			return [...prev, menuTagItem];
		});
		setStoreTagItem("");
	};
	const deleteItem = (event) => {
		const deleteTarget = event.target.parentElement.firstChild.innerText;
		console.log(deleteTarget);
		const filteredTagList = menuTagList.filter((tag) => tag !== deleteTarget);
		setStoreTagList(filteredTagList);
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		const getTagData = () => {
			axios({
				method: "get",
				url: "https://ecomap.kr/api/v1/tags/type?type=store",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				// console.log(res.data.data.content);
				setStoreTagList(res.data.data.content);
			});
		};
		getTagData();
	}, []);

	const registerStore = () => {
		const token = localStorage.getItem("token");

		const storeInfo = {
			name: storeName,
			phoneNumber: storePhoneNumber,
			description: storeDescription,
			addrDetail: `${storeAddressData.addrDetail} ${storeAddressDetail}`,
			addrDepth01: storeAddressData.addrDepth01,
			addrDepth02: storeAddressData.addrDepth02,
			addrDepth03: storeAddressData.addrDepth03,
			latitude: Number(storeAddressData.latitude),
			longitude: Number(storeAddressData.longitude),
			mondayTime: `${StoreOpenTime[0].openTime} ~ ${StoreOpenTime[0].closeTime}`,
			tuesdayTime: `${StoreOpenTime[1].openTime} ~ ${StoreOpenTime[1].closeTime}`,
			wednesdayTime: `${StoreOpenTime[2].openTime} ~ ${StoreOpenTime[2].closeTime}`,
			thursdayTime: `${StoreOpenTime[3].openTime} ~ ${StoreOpenTime[3].closeTime}`,
			fridayTime: `${StoreOpenTime[4].openTime} ~ ${StoreOpenTime[4].closeTime}`,
			saturdayTime: `${StoreOpenTime[5].openTime} ~ ${StoreOpenTime[5].closeTime}`,
			sundayTime: `${StoreOpenTime[6].openTime} ~ ${StoreOpenTime[6].closeTime}`,
			tagIds: selectedStoreTagIdList,
		};
		const json = JSON.stringify(storeInfo);
		const blob = new Blob([json], {
			type: "application/json",
		});
		const formData = new FormData();
		formData.append("createStoreRequest", blob);
		formData.append("files", storeImage);
		// 이미지 변환 안하고 그냥 보내면 됨 (추후 DB 정해지는 대로 수정)
		axios({
			method: "post",
			url: "https://ecomap.kr/api/v1/stores",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status < 300) {
				axios({
					method: "get",
					url: `${BASEURL}/api/v1/stores?page=0`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((res) => {
						console.log(res.data.data.content);
						setStoreList(res.data.data.content);
					})
					.then(() => {
						window.location.href = "/storeSetting";
					});
			}
		});
	};

	return (
		<Layout
			sideItems={[
				{ text: "조회 및 수정", url: "/storeSetting" },
				{ text: "등록", url: "/storeSetting/register" },
			]}>
			<StoreSettingContainer>
				<div className='font-bold text-3xl mb-3 text-black'>
					매장 등록
					<hr className='my-2' />
				</div>
				<div className=' text-black'>
					<div className='grid gap-6 mb-2 md:grid-cols-2'>
						<div>
							<label
								htmlFor='store_name'
								className='block mb-2 text-sm font-medium  text-gray-900 '>
								가게 이름
							</label>
							<input
								type='text'
								id='store_name'
								className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='가게 이름'
								required
								onChange={(event) => {
									setStoreName(event.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor='phone'
								className='block mb-2 text-sm font-medium text-gray-900 '>
								전화번호
							</label>
							<input
								type='tel'
								id='phone'
								className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='010-1234-5678'
								pattern='[0-9]{3}[0-9]{4}[0-9]{4}'
								required
								onChange={(event) => {
									setStorePhoneNumber(event.target.value);
								}}
							/>
						</div>
					</div>
					<div className='mb-2'>
						<label
							htmlFor='description'
							className='block mb-2 text-sm font-medium text-gray-900 '>
							가게 한줄 설명
						</label>
						<input
							type='text'
							id='description'
							className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='가게 설명입니다.'
							onChange={(event) => {
								setStoreDescription(event.target.value);
							}}
						/>
					</div>
					<div className='mb-2'>
						<label
							htmlFor='address'
							className='block mb-2 text-sm font-medium text-gray-900 '>
							주소
						</label>
						<div className='flex gap-6'>
							<input
								type='text'
								id='address'
								className=' bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='주소'
								value={storeAddress}
								required
								onClick={() => {
									if (!storeAddress) {
										setAddressSearchModalOpen(true);
									}
								}}
								onChange={(event) => {
									if (!storeAddress) {
										setAddressSearchModalOpen(true);
									}
									setStoreAddress(() => {
										event.target.value;
									});
								}}
							/>
							<input
								type='text'
								id='address'
								value={storeAddressDetail}
								className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='상세 주소'
								required
								onChange={(event) => {
									setStoreAddressDetail(event.target.value);
								}}
							/>{" "}
						</div>
					</div>
					<div>
						<div>영업시간</div>
						{StoreOpenTime.map((day, index) => {
							return <DayInput day={day} key={index} />;
						})}
					</div>

					<div>
						<div className='flex items-center  w-full'>
							<StoreImageRegister
								className='flex gap-3 items-center  w-full mb-2 text-sm  text-gray-900 dark:text-gray-300'
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
							</StoreImageRegister>
						</div>
						<form>
							<input
								className='hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
								id='file_input'
								type='file'
								onChange={(event) => {
									if (event.target.files) {
										setStoreImage((prev) => {
											return [...prev, event.target.files];
										});
									}
								}}
							/>
						</form>
					</div>
					<div className='text-slate-400'>
						{storeImage?.map((image, index) => {
							if (!image[0]) {
								return null;
							}
							const imageName = image[0].name;
							return (
								<div key={index}>
									{imageName}
									<button
										className='font-extrabold ml-2'
										onClick={() => {
											const filteredImage = storeImage?.filter((image) => {
												return image[0]?.name != imageName;
											});
											setStoreImage(filteredImage);
										}}>
										X
									</button>{" "}
								</div>
							);
						})}
					</div>
					<div>
						<StoreRegisterModalItemContainer className='w-full flex flex-col items-start gap-3 mt-6'>
							<StoreRegisterModalItemLabel className='w-full text-sm'>
								매장 태그 (최대 3개)
							</StoreRegisterModalItemLabel>
							<StoreTagWrapper className='w-full bg-white sm:w-4/6 max-w-lg rounded-xl'>
								<div className='flex items-center w-full'>
									{storeTagList.map((tag, index) => {
										return (
											<StoreTagItem className='flex gap-1' key={index}>
												<div>{tag}</div>
												<button onClick={deleteItem}>X</button>
											</StoreTagItem>
										);
									})}
									<input
										type='text'
										placeholder='#태그 입력'
										className='input border-0 rounded-xl w-1/3 font-normal'
										value={storeTagItem}
										onChange={(event) => {
											setStoreTagItem(event.target.value);
										}}
										onKeyPress={onKeyPress}
									/>{" "}
								</div>
							</StoreTagWrapper>
							<TagInstruction className='text-xs text-gray-600'>
								태그 입력 후 Enter
							</TagInstruction>
						</StoreRegisterModalItemContainer>
					</div>
					<button
						type='submit'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={(event) => {
							event.preventDefault();
							registerStore();
						}}>
						등록
					</button>
					{addressSearchModalOpen && (
						<AddressSearchModal
							changeOpen={setAddressSearchModalOpen}
							changeAddress={setStoreAddress}
						/>
					)}
				</div>
			</StoreSettingContainer>
		</Layout>
	);
}
