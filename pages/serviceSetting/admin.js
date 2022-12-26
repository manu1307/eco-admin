import styled from "styled-components";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const AdminPageContainer = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 20px;
	background-color: #f6f6f6;
`;

const AdminWrapper = styled.div`
	width: 100%;
	max-width: 1280px;
	height: 90%;
	max-height: 900px;
	margin-top: 20px;
	border-radius: 15px;
	box-shadow: 0 0 2px 1.5px #d8d8d8;
	background-color: #fff;
	padding: 20px 20px;
`;

export default function ServiceSettingAdmin() {
	const [loginRole, setLoginRole] = useState("");

	// 주소 정보 가져오기
	useEffect(() => {
		setLoginRole(localStorage.getItem("role"));
	}, []);

	return (
		<Layout
			sideItems={[
				// { text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "/serviceSetting" },
				// { text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				// { text: "알림 설정", url: "" },
				// { text: "태그 설정", url: "/serviceSetting/tag" },
				loginRole === "admin" && {
					text: "관리자",
					url: "/serviceSetting/admin",
				},
			]}>
			<AdminPageContainer>
				<ContentHeader firstCategory='서비스 설정' secondCategory='관리자' />
				<AdminWrapper>
					<div className=' text-black'>
						<div className='grid gap-2 sm:gap-6 mb-2 md:grid-cols-1'>
							<div>
								<label
									htmlFor='store_name'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									그룹
								</label>
								<select className=' border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500'>
									<option>BHC</option>
									<option>EVC</option>
									<option>MEC</option>
								</select>
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
									placeholder='01012345678'
									pattern='[0-9]{3}[0-9]{4}[0-9]{4}'
									required
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
									placeholder='01012345678'
									pattern='[0-9]{3}[0-9]{4}[0-9]{4}'
									required
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
							/>
						</div>
						<div className='mb-2'>
							<label
								htmlFor='address'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
								주소
							</label>
							<div className='flex  flex-col sm:flex-row  gap-2 sm:gap-6'></div>
						</div>
					</div>
				</AdminWrapper>
			</AdminPageContainer>
		</Layout>
	);
}
