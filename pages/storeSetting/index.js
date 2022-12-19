import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
	apiBaseAddressState,
	currentStoreState,
} from "../../states/global/globalState";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { storeAddrState } from "../../states/StoreSetting/storeAddressState";
import AddressSearchModal from "../../components/UI/Modal/AddressSearchModal";

const StoreEditingContainer = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 28px;
	@media screen and (max-width: 640px) {
	}
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

export default function MarketEdit() {
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const currentStore = useRecoilValue(currentStoreState);

	const [storeList, setStoreList] = useState([]);
	const [selectedStore, setSelectedStore] = useState({});
	const [storeData, setStoreData] = useState({});

	const [storeName, setStoreName] = useState();
	const [storePhoneNumber, setStorePhoneNumber] = useState();
	const [storeDescription, setStoreDescription] = useState();
	const [storeAddress, setStoreAddress] = useState();
	const [storeImage, setStoreImage] = useState();

	const storeAddressData = useRecoilValue(storeAddrState);
	const [storeAddressDetail, setStoreAddressDetail] = useState("");

	const [addressSearchModalOpen, setAddressSearchModalOpen] = useState(false);

	const [storeTagList, setStoreTagList] = useState([]);

	const [selectedStoreTagList, setSelectedStoreTagList] = useState([]);
	const [tagStoresList, setTagStoresList] = useState([]);

	//가게 태그 가져오기
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
				const tagData = res.data.data;
				const selectedTag = tagData.filter((tag) => tag.check == true);
				setStoreTagList(tagData);
				setSelectedStoreTagList(selectedTag);
			});
		};
		getTagData();
	}, []);

	//가게 리스트 가져오기
	useEffect(() => {
		if (!selectedStore.name) {
			const token = localStorage.getItem("token");
			axios({
				method: "get",
				url: `${BASEURL}/api/v1/stores`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setStoreList(res.data);
			});
		}
	}, [BASEURL, selectedStore.name]);

	//가게 정보 정보 조회
	useEffect(() => {
		const getSpecificStoreData = () => {
			const storeId = currentStore[0]?.storeId;
			if (storeId) {
				axios({
					method: "get",
					url: `${BASEURL}/api/v1/stores/${storeId}`,
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}).then((res) => {
					const fetchedStoreData = res.data.data;
					// console.log(fetchedStoreData);
					setStoreData(fetchedStoreData);
					setStoreName(fetchedStoreData.name);
					setStorePhoneNumber(fetchedStoreData.phoneNumber);
					setStoreDescription(fetchedStoreData.description);
					setStoreImage(fetchedStoreData.images);
					setStoreAddressDetail(fetchedStoreData.addrDetail.trim());
					const checkedStoreTagList = fetchedStoreData.tagList.filter(
						(tag) => tag.check == true
					);
					setSelectedStoreTagList((prev) => {
						return checkedStoreTagList;
					});
					setTagStoresList(fetchedStoreData.tagList);
				});
			} else {
				return;
			}
		};
		getSpecificStoreData();
	}, [selectedStore, BASEURL, currentStore]);
	//가게 정보 수정
	const editStore = () => {
		const token = localStorage.getItem("token");
		const storeId = currentStore[0]?.storeId;

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
			tagStores: tagStoresList,
		};
		const json = JSON.stringify(storeInfo);
		const blob = new Blob([json], {
			type: "application/json",
		});
		const formData = new FormData();
		formData.append("updateStoreInfoRequest", blob);
		formData.append("files", storeImage);
		// 이미지 변환 안하고 그냥 보내면 됨 (추후 DB 정해지는 대로 수정)
		axios({
			method: "put",
			url: `https://ecomap.kr/api/v1/stores/${storeId}`,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status == 200) {
				alert("정보 수정이 완료되었습니다.");
				window.location.href = "/storeSetting/edit";
			}
		});
	};

	return (
		<Layout
			sideItems={[
				{ text: "조회 및 수정", url: "/storeSetting" },
				{ text: "등록", url: "/storeSetting/register" },
			]}>
			<div>
				<StoreEditingContainer>
					<div className='font-bold text-3xl mb-3'>
						매장 정보 조회 및 수정
						<hr className='my-2' />
					</div>
					<div className=' text-black'>
						<div className='grid gap-2 sm:gap-6 mb-2 md:grid-cols-2'>
							<div>
								<label
									htmlFor='store_name'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									가게 이름
								</label>
								<input
									type='text'
									id='store_name'
									value={storeName}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									전화번호
								</label>
								<input
									type='tel'
									id='phone'
									value={storePhoneNumber}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='01012345678'
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
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
								가게 한줄 설명
							</label>
							<input
								type='text'
								id='description'
								value={storeDescription}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='가게 설명입니다.'
								onChange={(event) => {
									setStoreDescription(event.target.value);
								}}
							/>
						</div>
						<div className='mb-2'>
							<label
								htmlFor='address'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
								주소
							</label>
							<div className='flex  flex-col sm:flex-row  gap-2 sm:gap-6'>
								{/* 모바일 주소 */}
								<input
									type='text'
									id='address'
									className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:hidden w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='주소'
									value={storeAddressDetail}
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
								{/* PC 주소 */}
								<input
									type='text'
									id='address'
									className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hidden sm:block w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hidden sm:block w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='상세 주소'
									required
									onChange={(event) => {
										setStoreAddressDetail(event.target.value);
									}}
								/>{" "}
							</div>
						</div>
						{/* <div>
							<div>영업시간</div>
							{StoreOpenTime.map((day, index) => {
								return <DayInput day={day} key={index} />;
							})}
						</div> */}

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
								const imageName = image[0].name;
								return (
									<div key={index}>
										<Image src={image} width={50} height={50} alt='매장 사진' />
										{/* {imageName}
										<button
											onClick={() => {
												const filteredImage = storeImage?.filter((image) => {
													return image[0].name != imageName;
												});
												setStoreImage(filteredImage);
											}}>
											X
										</button>{" "} */}
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
										{selectedStoreTagList?.map((tag, i) => {
											const { tagId, tagName, check } = tag;
											return (
												check && (
													<StoreTagSelected className='text-sm' key={i}>
														#{tagName}
														<button
															onClick={() => {
																const filteredList =
																	selectedStoreTagList.filter((tag) => {
																		return tag !== tagName;
																	});
																setSelectedStoreTagList(filteredList);
																setTagStoresList((prev) => {
																	const editedTag = prev.map((prevTag) => {
																		if (prevTag.tagName == tagName) {
																			prevTag.check == true &&
																				(prevTag.check = !prevTag.check);
																		}
																		return prevTag;
																	});
																	return editedTag;
																});
															}}>
															×
														</button>
													</StoreTagSelected>
												)
											);
										})}
									</div>
									<div className='w-full flex flex-wrap gap-2  rounded-xl mb-3 sm:h-5'>
										{tagStoresList?.map((tag, i) => {
											return (
												<StoreTagItemButton
													className='text-sm'
													key={i}
													onClick={(event) => {
														const targetTag = tag.tagName;
														if (selectedStoreTagList.length < 3) {
															setTagStoresList((prev) => {
																const editedTag = prev.map((tag) => {
																	if (tag.tagName == targetTag) {
																		tag.check == false &&
																			(tag.check = !tag.check);
																	}
																	return tag;
																});
																return editedTag;
															});
															setSelectedStoreTagList((prev) => {
																const set = new Set([...prev, targetTag]);
																const noOverLapArr = [...set];
																return noOverLapArr;
															});
														} else {
															alert("태그는 2개까지만 선택 가능합니다.");
														}
													}}>
													#{tag.tagName}
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
								editStore();
							}}>
							수정
						</button>
						{addressSearchModalOpen && (
							<AddressSearchModal
								changeOpen={setAddressSearchModalOpen}
								changeAddress={setStoreAddress}
							/>
						)}
					</div>
				</StoreEditingContainer>
			</div>
		</Layout>
	);
}
