import { useEffect, useState } from "react";

export default function TimeSelect(props) {
	const {
		requestData,
		shopCodeList,
		id,
		deleteItem,
		shopHourRequests,
		setShopHourRequests,
		setOldHourRequests,
	} = props;
	// console.log(requestData);
	// console.log(id);
	// console.log(shopCodeList);

	const [timeCode, setTimeCode] = useState({});
	// const [timeCodeName, setTimeCodeName] = useState();
	const [fromTime, setFromTime] = useState();
	const [toTime, setToTime] = useState();
	const [timeDesc, setTimeDesc] = useState();
	useEffect(() => {
		if (requestData) {
			requestData?.shopHourId && setOldHourRequests(requestData);
			setTimeCode(requestData?.name);
			// setTimeCodeName(requestData?.name);
			setFromTime(translateRequestTime(requestData?.fromTime));
			setToTime(translateRequestTime(requestData?.toTime));
			setTimeDesc(requestData?.desc);
		}
	}, [
		requestData,
		setOldHourRequests,
		requestData?.name,
		requestData?.codeId,
		requestData?.desc,
	]);
	// 시간 request로 넣어줄 때 변환
	const translateTime = (data) => {
		const hour = data.slice(0, 2);
		const minute = data.slice(-2);
		console.log(`${hour}${minute}`);
		return `${hour}${minute}`;
	};
	//처음 시간 변환
	const translateRequestTime = (data) => {
		const hour = data.slice(0, 2);
		const minute = data.slice(-2);
		return `${hour}:${minute}`;
	};
	const findCodeItem = (name) => {
		const foundItem = shopCodeList.find((code) => {
			return code.name === name;
		});
		return foundItem;
	};

	return (
		<div>
			<div className='flex flex-col sm:flex-row gap-2'>
				<select
					value={timeCode}
					className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					onChange={(event) => {
						const timeCodeName = event.target.value;
						const foundItem = findCodeItem(timeCodeName);
						setShopHourRequests((prev) => {
							const tmpData = [...prev];
							tmpData[id].codeId = foundItem.id;
							tmpData[id].name = foundItem.name;
							console.log(prev);
							return tmpData;
						});
						setTimeCode(foundItem.name);
					}}>
					{shopCodeList.map((codeData) => {
						return (
							<option key={codeData.id} value={codeData.name}>
								{codeData.name}
							</option>
						);
					})}
				</select>
				<div className='flex gap-2'>
					<input
						type='time'
						value={fromTime}
						className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						onChange={(event) => {
							setShopHourRequests((prev) => {
								const tmpData = [...prev];
								tmpData[id].fromTime = translateTime(event.target.value);
								return tmpData;
							});
							setFromTime(event.target.value);
						}}
					/>
					<div className='py-2.5 font-extrabold'>~</div>
					<input
						type='time'
						value={toTime}
						className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						onChange={(event) => {
							setShopHourRequests((prev) => {
								const tmpData = [...prev];
								tmpData[id].toTime = translateTime(event.target.value);
								return tmpData;
							});
							setToTime(event.target.value);
						}}
					/>
				</div>
				<input
					type='text'
					value={timeDesc}
					placeholder='비고'
					className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					onChange={(event) => {
						setShopHourRequests((prev) => {
							const tmpData = [...prev];
							tmpData[id].desc = event.target.value;
							return tmpData;
						});
						setTimeDesc(event.target.value);
					}}
				/>
				<button onClick={() => deleteItem(id)}>
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
							d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
