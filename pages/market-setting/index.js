import axios from "axios";
import { useState } from "react";
import Layout from "../../components/UI/Layout/Layout";

const StoreOpenTime = [
	{ day: "월요일", openTime: "", closeTime: "" },
	{ day: "화요일", openTime: "", closeTime: "" },
	{ day: "수요일", openTime: "", closeTime: "" },
	{ day: "목요일", openTime: "", closeTime: "" },
	{ day: "금요일", openTime: "", closeTime: "" },
	{ day: "토요일", openTime: "", closeTime: "" },
	{ day: "일요일", openTime: "", closeTime: "" },
];

export default function MarketSetting() {
	const [storeName, setStoreName] = useState("");
	const [storePhoneNumber, setStorePhoneNumber] = useState("");
	const [storeDescription, setStoreDescription] = useState("");
	const [storeAddress, setStoreAddress] = useState("");
	const [storeImage, setStoreImage] = useState();

	return (
		<Layout
			sideItems={[
				{ text: "매장 설정", url: "/market-setting" },
				{ text: "태그 설정", url: "/market-setting/tag" },
			]}>
			<div className='p-5'>
				<div className='grid gap-6 mb-2 md:grid-cols-2'>
					<div>
						<label
							htmlFor='store_name'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
							가게 이름
						</label>
						<input
							type='text'
							id='store_name'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='가게 이름'
							required=''
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
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='010-1234-5678'
							pattern='[0-9]{3}[0-9]{4}[0-9]{4}'
							required=''
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
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='가게 설명입니다.'
						required=''
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
					<input
						type='text'
						id='address'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='서울시 강남구'
						required=''
						onChange={(event) => {
							setStoreAddress(event.target.value);
						}}
					/>
				</div>
				<div>영업시간</div>
				{StoreOpenTime.map((day, index) => {
					return (
						<div className='mb-2 flex items-center gap-2' key={index}>
							<label for='appt' className='text-sm'>
								{day.day}
							</label>
							<input
								className='rounded-lg p-1'
								type='time'
								onChange={(event) => {
									day.openTime = event.target.value;
								}}
								required></input>
							<div className='mx-3 font-bold'>~</div>
							<input
								className='rounded-lg p-1'
								type='time'
								onChange={(event) => {
									day.closeTime = event.target.value;
								}}
								required></input>
						</div>
					);
				})}
				<div>
					<label
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						htmlFor='file_input'>
						매장 사진 업로드
					</label>
					<input
						className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
						id='file_input'
						type='file'
						onChange={(event) => {
							setStoreImage(() => {
								return event.target.files[0];
							});
						}}
					/>
				</div>
				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					onClick={(event) => {
						event.preventDefault();
						const token = localStorage.getItem("token");
						let formData = new FormData();
						const storeDto = {
							// name: storeName,
							// phoneNumber: storePhoneNumber,
							// description: storeDescription,
							// address: storeAddress,
							// mondayTime: `${StoreOpenTime[0].openTime} ~ ${StoreOpenTime[0].closeTime}`,
							// tuesdayTime: `${StoreOpenTime[1].openTime} ~ ${StoreOpenTime[1].closeTime}`,
							// wednesdayTime: `${StoreOpenTime[2].openTime} ~ ${StoreOpenTime[2].closeTime}`,
							// thursdayTime: `${StoreOpenTime[3].openTime} ~ ${StoreOpenTime[3].closeTime}`,
							// fridayTime: `${StoreOpenTime[4].openTime} ~ ${StoreOpenTime[4].closeTime}`,
							// saturdayTime: `${StoreOpenTime[5].openTime} ~ ${StoreOpenTime[5].closeTime}`,
							// sundayTime: `${StoreOpenTime[6].openTime} ~ ${StoreOpenTime[6].closeTime}`,
							name: "맘스터치",
							phoneNumber: "01012341234",
							emdName: "이태원동",
							description: "가게 설명입니다.",
							address: "서울시 동작구",
							latitude: "37.5576984952347",
							longitude: "127.079226104632",
							mondayTime: "09:00 ~ 21:00",
							tuesdayTime: "09:00 ~ 21:00",
							wednesdayTime: "09:00 ~ 21:00",
							thursdayTime: "09:00 ~ 21:00",
							fridayTime: "09:00 ~ 21:00",
							saturdayTime: "09:00 ~ 21:00",
							sundayTime: "09:00 ~ 21:00",
							tagIds: ["1", "2"],
						};
						formData.append(
							"createStoreDto",
							new Blob([JSON.stringify(storeDto)], { type: "application/json" })
						);
						formData.append("files", storeImage);
						axios({
							method: "post",
							url: "https://ecomap.kr/api/v1/stores",
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${token}`,
							},
							data: formData,
						}).then((res) => {
							console.log(res.status);
						});
						console.log(
							storeName,
							storePhoneNumber,
							storeDescription,
							storeAddress,
							StoreOpenTime
						);
					}}>
					설정
				</button>
			</div>
		</Layout>
	);
}
