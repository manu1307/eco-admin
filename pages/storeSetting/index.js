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
`;

const StoreRegisterModalItemContainer = styled.div`
	width: 100%;
`;
const StoreRegisterModalItemLabel = styled.div`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
`;

const StoreTagItemButton = styled.button`
	padding: 1px 5px;
	font-weight: 400;
	color: #595959;
	border-radius: 10px;
	border: 1px solid #595959;
	:hover {
		color: black;
	}
`;
const StoreTagSelected = styled.div`
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
const StoreImageRegister = styled.label`
	@media screen and (max-width: 640px) {
		font-size: 11px;
	}
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

	const [storeTagList, setStoreTagList] = useState([]);

	const [selectedStoreTagIdList, setSelectedStoreTagIdList] = useState([]);
	const [selectedStoreTagList, setSelectedStoreTagList] = useState([]);

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
				setStoreTagList(res.data.data);
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
			if (res.status == 200) {
				axios({
					method: "get",
					url: `${BASEURL}/api/v1/stores`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => {
					setStoreList(() => {
						return res.data;
					});
				});
			}
		});
	};

	return (
		<Layout
			sideItems={[
				{ text: "등록", url: "/storeSetting" },
				{ text: "조회 및 수정", url: "/storeSetting/edit" },
			]}>
			<StoreSettingContainer>
				<div className='font-bold text-3xl mb-3'>
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
										console.log(storeImage);
									}
								}}
							/>
						</form>
					</div>
					<div className='text-slate-400'>
						{storeImage?.map((image, index) => {
							if (!image[0]) {
								return;
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
							<div className='w-full'>
								<div className='w-full flex flex-wrap m-0 gap-2 rounded-xl mb-3 sm:h-5'>
									{selectedStoreTagList.map((tag, i) => {
										return (
											<StoreTagSelected className='text-sm' key={i}>
												#{tag}
												<button
													onClick={() => {
														const filteredList = selectedStoreTagList.filter(
															(selectedTag) => {
																return selectedTag !== tag;
															}
														);
														setSelectedStoreTagList(filteredList);
													}}>
													×
												</button>
											</StoreTagSelected>
										);
									})}
								</div>
								<div className='w-full flex flex-wrap gap-2  rounded-xl mb-3 sm:h-5'>
									{storeTagList?.map((tag, i) => {
										return (
											<StoreTagItemButton
												className='text-sm'
												key={i}
												onClick={() => {
													if (selectedStoreTagList.length < 3) {
														setSelectedStoreTagIdList((prev) => {
															const set = new Set([...prev, tag.tagId]);
															const noOverLapArr = [...set];
															return noOverLapArr;
														});
														setSelectedStoreTagList((prev) => {
															const set = new Set([...prev, tag.name]);
															const noOverLapArr = [...set];
															return noOverLapArr;
														});
													} else {
														alert("태그는 2개까지만 선택 가능합니다.");
													}
												}}>
												#{tag.name}
											</StoreTagItemButton>
										);
									})}
								</div>
							</div>
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
