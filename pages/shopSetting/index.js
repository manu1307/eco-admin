import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
	apiBaseAddressState,
	currentShopState,
	currentStoreState,
} from "../../states/global/globalState";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { shopAddrState } from "../../states/StoreSetting/storeAddressState";
import AddressSearchModal from "../../components/UI/Modal/AddressSearchModal";
import TimeSelect from "../../components/ShopSetting/TimeSelect";

const StoreEditingContainer = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 28px;
	@media screen and (max-width: 640px) {
	}
`;
const StoreRegisterTagItemContainer = styled.div`
	width: 100%;
`;
const StoreRegisterTagItemLabel = styled.div`
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

export default function MarketEdit() {
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const currentShop = useRecoilValue(currentShopState);
	const [shopId, setShopId] = useState();

	const [shopList, setShopList] = useState([]);
	const [selectedShop, setSelectedShop] = useState({});
	const [shopData, setShopData] = useState({});

	const [shopName, setShopName] = useState();
	const [shopPhoneNumber, setShopPhoneNumber] = useState();
	const [shopDescription, setShopDescription] = useState();
	const [shopAddress, setShopAddress] = useState();
	const [shopImage, setShopImage] = useState([]);

	const shopAddressData = useRecoilValue(shopAddrState);
	const [shopAddr, setShopAddr] = useState("");

	const [addressSearchModalOpen, setAddressSearchModalOpen] = useState(false);

	//?????? ???????????? ??????
	const [shopCodeList, setShopCodeList] = useState([]);
	const [shopHourRequests, setShopHourRequests] = useState([
		{ codeId: "", name: "", fromTime: "", toTime: "", desc: "" },
	]);
	const [oldHourRequests, setOldHourRequests] = useState();

	const [shopTagItem, setShopTagItem] = useState("");
	const [shopTagList, setShopTagList] = useState([]);

	//?????? ????????? ????????????
	useEffect(() => {
		if (!selectedShop.name) {
			const token = localStorage.getItem("token");
			axios({
				method: "get",
				url: `${BASEURL}/api/v1/shops`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setShopList(res.data);
			});
		}
	}, [BASEURL, selectedShop.name]);
	useEffect(() => {
		setShopId(localStorage.getItem("shopId"));
	}, [currentShop]);
	//?????? ?????? ?????? ??????
	useEffect(() => {
		if (shopId) {
			console.log(shopId);
			axios({
				method: "get",
				url: `${BASEURL}/api/v1/shops/${shopId}`,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
				.then((res) => {
					const fetchedShopData = res.data.data;
					console.log(fetchedShopData);
					setShopData(fetchedShopData);
					setShopName(fetchedShopData.name);
					setShopPhoneNumber(fetchedShopData.phone);
					setShopDescription(fetchedShopData.desc);
					setShopImage((prev) => {
						return fetchedShopData.images ? fetchedShopData.images : [...prev];
					});
					setShopAddr(fetchedShopData.addr.trim());
					setShopTagList(fetchedShopData.shopHashcodeInfoResponses);
					setOldHourRequests(fetchedShopData.shopHourInfoResponses);
					// console.log(fetchedShopData.shopHourInfoResponses);
				})
				.then(() => {
					oldHourRequests &&
						(() => {
							const shopHourInfo = [...oldHourRequests];
							delete shopHourInfo[0].shopHourId;
							const initialCodeId = shopCodeList.find((code) => {
								return code.name === shopHourInfo[0].name;
							});
							if (!initialCodeId) {
								return;
							}
							shopHourInfo[0].codeId = initialCodeId.id;
							setShopHourRequests(shopHourInfo);
						})();
				});
		} else {
			return;
		}
	}, [
		selectedShop,
		BASEURL,
		currentShop,
		shopCodeList,
		shopId,
		// oldHourRequests,
	]);

	//?????? ???????????? ?????? ??????
	useEffect(() => {
		const token = localStorage.getItem("token");
		axios({
			method: "get",
			url: `${BASEURL}/api/v1/codes/type?type=BHC`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			res.data.success = true && setShopCodeList(res.data.data);
		});
	}, [BASEURL]);

	//???????????? ??????
	const deleteRequest = (index) => {
		shopHourRequests.length >= 2 &&
			setShopHourRequests((prev) => {
				const tmpArr = [...prev];
				tmpArr.splice(index);
				return tmpArr;
			});
	};

	// ?????? ??????
	const onKeyPress = (event) => {
		const currentTag = event.target.value;
		if (currentTag.length !== 0 && event.key === "Enter") {
			submitTagItem();
		}
	};
	const submitTagItem = () => {
		if (shopTagList.length >= 3) {
			alert("????????? ?????? 3???????????? ?????? ???????????????.");
			setShopTagItem("");
			return;
		}

		setShopTagList((prev) => {
			return [...prev, { hashtag: shopTagItem }];
		});
		setShopTagItem("");
	};
	const deleteItem = (event) => {
		const deleteTarget = event.target.parentElement.firstChild.innerText;
		console.log(deleteTarget);
		const filteredTagList = shopTagList.filter(
			(tag) => tag.hashtag !== deleteTarget
		);
		setShopTagList(filteredTagList);
	};

	//?????? ?????? ??????
	const editStore = () => {
		const token = localStorage.getItem("token");
		// console.log(shopHourRequests);
		// console.log(oldHourRequests);
		// console.log(shopTagList);
		const shopInfo = {
			name: shopName,
			phone: shopPhoneNumber,
			desc: shopDescription,
			addrDetail: `${shopAddressData.addrDetail} ${shopAddr}`,
			addrDepth01: shopAddressData.addrDepth01
				? shopAddressData.addrDepth01
				: "",
			addrDepth02: shopAddressData.addrDepth02
				? shopAddressData.addrDepth02
				: "",
			addrDepth03: shopAddressData.addrDepth03
				? shopAddressData.addrDepth03
				: "",
			latitude: Number(shopAddressData.latitude),
			longitude: Number(shopAddressData.longitude),
			// tagStores: tagShopsList,
			createShopHourRequests: shopHourRequests,
			updateShopHourRequests: oldHourRequests,
			updateShopHashcodeRequests: shopTagList,
		};
		console.log(shopInfo);
		const json = JSON.stringify(shopInfo);
		const blob = new Blob([json], {
			type: "application/json",
		});
		const formData = new FormData();
		formData.append("updateShopInfoRequest", blob);
		formData.append("files", shopImage);
		// ????????? ?????? ????????? ?????? ????????? ??? (?????? DB ???????????? ?????? ??????)
		axios({
			method: "put",
			url: `https://ecomap.kr/api/v1/shops/${shopId}`,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status == 200) {
				alert("?????? ????????? ?????????????????????.");
				window.location.href = "/shopSetting";
			}
		});
	};

	return (
		<Layout
			sideItems={[
				{ text: "?????? ??? ??????", url: "/shopSetting" },
				{ text: "??????", url: "/shopSetting/register" },
			]}>
			<div>
				<StoreEditingContainer>
					<div className='font-bold text-3xl mb-3 text-black'>
						?????? ?????? ?????? ??? ??????
						<hr className='my-2' />
					</div>
					<div className=' text-black'>
						<div className='grid gap-2 sm:gap-6 mb-2 md:grid-cols-2'>
							<div>
								<label
									htmlFor='store_name'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									?????? ??????
								</label>
								<input
									type='text'
									id='store_name'
									value={shopName}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='?????? ??????'
									required
									onChange={(event) => {
										setShopName(event.target.value);
									}}
								/>
							</div>
							<div>
								<label
									htmlFor='phone'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									????????????
								</label>
								<input
									type='tel'
									id='phone'
									value={shopPhoneNumber}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='01012345678'
									pattern='[0-9]{3}[0-9]{4}[0-9]{4}'
									required
									onChange={(event) => {
										setShopPhoneNumber(event.target.value);
									}}
								/>
							</div>
						</div>
						<div className='mb-2'>
							<label
								htmlFor='desc'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
								?????? ?????? ??????
							</label>
							<input
								type='text'
								id='desc'
								value={shopDescription}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='?????? ???????????????.'
								onChange={(event) => {
									setShopDescription(event.target.value);
								}}
							/>
						</div>
						<div className='mb-2'>
							<label
								htmlFor='address'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
								??????
							</label>
							<div className='flex  flex-col sm:flex-row  gap-2 sm:gap-6'>
								{/* ????????? ?????? */}
								<input
									type='text'
									id='address'
									className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:hidden w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='??????'
									value={shopAddress}
									required
									onClick={() => {
										if (!shopAddress) {
											setAddressSearchModalOpen(true);
										}
									}}
									onChange={(event) => {
										setShopAddress(() => {
											event.target.value;
										});
									}}
								/>
								<input
									type='text'
									id='address'
									value={shopAddr}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:hidden  w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='?????? ??????'
									required
									onChange={(event) => {
										setShopAddr(event.target.value);
									}}
								/>
								{/* PC ?????? */}
								<input
									type='text'
									id='address'
									className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hidden sm:block w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='??????'
									value={shopAddress}
									required
									onClick={() => {
										if (!shopAddress) {
											setAddressSearchModalOpen(true);
										}
									}}
									onChange={(event) => {
										setShopAddress(() => {
											event.target.value;
										});
									}}
								/>
								<input
									type='text'
									id='address'
									value={shopAddr}
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hidden sm:block w-full sm:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='?????? ??????'
									required
									onChange={(event) => {
										setShopAddr(event.target.value);
									}}
								/>{" "}
							</div>
						</div>
						<div>
							<label className='block mb-2 text-sm font-medium  text-gray-900 '>
								???????????? <sup style={{ color: "red" }}>*</sup>
							</label>
							{shopHourRequests.map((request, index) => {
								// console.log(request);
								return (
									<div key={index} className='my-2'>
										<TimeSelect
											requestData={request}
											shopCodeList={shopCodeList}
											id={index}
											deleteItem={deleteRequest}
											shopHourRequests={shopHourRequests}
											setShopHourRequests={setShopHourRequests}
											setOldHourRequests={setOldHourRequests}
										/>
									</div>
								);
							})}
							<div className='my-2 w-1/4 m-auto flex justify-center'>
								<button
									className=' text-xl font-extrabold border-gray-300 border-4 rounded-full w-10 h-10 flex align-middle justify-center hover:bg-slate-500 hover:text-white'
									onClick={() => {
										setShopHourRequests((prev) => {
											return [
												...prev,
												{
													codeId: "",
													name: "",
													fromTime: "",
													toTime: "",
													desc: "",
												},
											];
										});
									}}>
									+
								</button>
							</div>
						</div>
						<div>
							<div className='flex items-center  w-full'>
								<StoreImageRegister
									className='flex gap-3 items-center  w-full mb-2 text-sm  text-gray-900 dark:text-gray-300'
									htmlFor='file_input'>
									?????? ??????
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
											setShopImage((prev) => {
												console.log(prev);
												return [...prev, event.target.files];
											});
											console.log(shopImage);
										}
									}}
								/>
							</form>
						</div>
						<div className='text-slate-400'>
							{shopImage?.map((image, index) => {
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
												const filteredImage = shopImage?.filter((image) => {
													return image[0]?.name != imageName;
												});
												setShopImage(filteredImage);
											}}>
											X
										</button>{" "}
									</div>
								);
							})}
						</div>
						<div>
							<StoreRegisterTagItemContainer className='w-full flex flex-col items-start gap-3 mt-6'>
								<StoreRegisterTagItemLabel className='w-full text-sm'>
									?????? ?????? (?????? 3???)
								</StoreRegisterTagItemLabel>
								<StoreTagWrapper className='w-full bg-white sm:w-4/6 max-w-lg rounded-xl'>
									<div className='flex items-center w-full h-10'>
										{shopTagList.map((tag) => {
											return (
												<StoreTagItem
													className='flex gap-1'
													key={tag.shopHashcodeId}>
													<div>{tag.hashtag}</div>
													<button onClick={deleteItem}>X</button>
												</StoreTagItem>
											);
										})}
										{shopTagList.length < 3 && (
											<input
												type='text'
												placeholder='#?????? ??????'
												className='input border-0 rounded-xl w-auto font-normal h-10'
												value={shopTagItem}
												onChange={(event) => {
													setShopTagItem(event.target.value);
												}}
												onKeyPress={onKeyPress}
											/>
										)}
									</div>
								</StoreTagWrapper>
								<TagInstruction className='text-xs text-gray-600'>
									?????? ?????? ??? Enter
								</TagInstruction>
							</StoreRegisterTagItemContainer>{" "}
						</div>
						<button
							type='submit'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							onClick={(event) => {
								event.preventDefault();
								editStore();
							}}>
							??????
						</button>
						{addressSearchModalOpen && (
							<AddressSearchModal
								changeOpen={setAddressSearchModalOpen}
								changeAddress={setShopAddress}
							/>
						)}
					</div>
				</StoreEditingContainer>
			</div>
		</Layout>
	);
}
