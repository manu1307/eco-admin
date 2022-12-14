import styled from "styled-components";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import { useRef, useEffect, useState } from "react";
import StampCoupon from "../../components/ServiceSetting/Coupon";

const StampPageContainer = styled.div`
	width: 100%;
	max-width: 1140px;
	padding: 20px;
	background-color: #f6f6f6;
`;
const StampButtonWrapper = styled.div`
	width: 100%;
	max-width: 1140px;
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	margin-bottom: 20px;
`;
const StampButton = styled.button`
	background: none;
	border: none;
	outline: none;
	width: 49%;
	max-width: 560px;
	height: 60px;
	border-radius: 10px;
	background-color: #bcbcbc;
	&:focus {
		background-color: #121533;
		color: white;
	}
`;
const StampContentSetting = styled.div`
	width: 100%;
	max-width: 1140px;
`;
const SettingWrapper = styled.div`
	width: 100%;
	max-width: 1140px;
	background-color: white;
	padding: 20px;
	border-radius: 20px;
	display: flex;
	gap: 20px;
	margin-bottom: 30px;
`;
const SettingBox = styled.div`
	width: 420px;
	padding: 40px;
	background-color: #fafafa;
	border-radius: 5px;
`;
const ConfirmButton = styled.button`
	width: 220px;
	background-color: #121533;
	color: white;
	padding: 16px 20px;
	border-radius: 28px;
`;
const StampGuideWrapper = styled.div`
	width: 100%;
	max-width: 1140px;
`;
const StampGuide = styled.div`
	width: 100%;
	max-width: 1140px;
	height: 330px;
	background-color: white;
	border-radius: 20px;
	display: flex;
`;
const StampGuideComment = styled.div`
	width: 990px;
	padding: 20px 25px;
`;
const StampGuideCoupon = styled.div``;
export default function Stamp() {
	const tumblerButton = useRef();
	const normalButton = useRef();
	let focusedButton = "tumblerButton";
	useEffect(() => {
		tumblerButton && tumblerButton.current.focus();
	}, []);
	const checkFocusedButton = () => {
		if (focusedButton == "tumblerButton") {
			tumblerButton.current.focus();
		} else if (focusedButton == "normalButton") {
			normalButton.current.focus();
		}
	};
	// 스탬프 종류 클릭 버튼 코드 개선 필요

	return (
		<Layout
			sideItems={[
				// { text: "텀블러 할인 설정", url: "" },
				{ text: "단골 스탬프 설정", url: "/serviceSetting/stamp" },
				// { text: "단골 리스트", url: "" },
				{ text: "메뉴 설정", url: "/serviceSetting/menu" },
				{ text: "마감타임 설정", url: "/serviceSetting/closingsale" },
				// { text: "알림 설정", url: "" },
				{ text: "태그 설정", url: "/serviceSetting/tag" },
				// { text: "댓글신고", url: "" },
			]}>
			<StampPageContainer>
				<ContentHeader
					firstCategory='서비스 설정'
					secondCategory='단골스탬프 설정'
				/>
				<StampButtonWrapper>
					<StampButton
						ref={tumblerButton}
						onClick={() => {
							focusedButton = "tumblerButton";
						}}
						onBlur={checkFocusedButton}>
						텀블러 스탬프
					</StampButton>
					<StampButton
						ref={normalButton}
						onClick={() => {
							focusedButton = "normalButton";
						}}
						onBlur={checkFocusedButton}>
						일반 스탬프
					</StampButton>
				</StampButtonWrapper>
				<StampContentSetting>
					<div className='font-bold text-lg'>스탬프 내용 설정</div>
					<SettingWrapper>
						<SettingBox>
							<div className='mb-5'>
								<div className='flex items-center gap-2'>
									<input type='checkbox' className='border-2' />
									<div
										style={{
											color: "#242746",
											fontSize: 24,
											fontWeight: "bold",
										}}>
										적립
									</div>
									<div style={{ color: "#00E1D4" }}>% 할인</div>
								</div>
								<div className='text-sm' style={{ color: "#2A3042" }}>
									10번 방문 시 포인트 *배 적립
								</div>
							</div>
							<div>
								<input type='number' className='rounded-full px-5 mr-2' />
								<span>배 적립</span>
							</div>
						</SettingBox>
						<SettingBox>
							<div className='mb-5'>
								<div className='flex items-center gap-2'>
									<input type='checkbox' className='border-2' />
									<div
										style={{
											color: "#242746",
											fontSize: 24,
											fontWeight: "bold",
										}}>
										증정
									</div>
									<div style={{ color: "#00E1D4" }}>덤 증정</div>
								</div>
								<div className='text-sm' style={{ color: "#2A3042" }}>
									10번 방문 시 (매장상품) 무료
								</div>
							</div>
							<div>
								<input type='text' className='rounded-full px-5 mr-2' />
								<span>무료</span>
							</div>
						</SettingBox>
						<div className='w-1/6 flex items-end'>
							<ConfirmButton>확인</ConfirmButton>
						</div>
					</SettingWrapper>
					<StampGuideWrapper>
						<div className='font-bold text-lg'>스타벅스 단골 스탬프</div>
						<StampGuide>
							<StampGuideComment>
								<div className='p-3 text-sm'>서울시 송파구 올림픽로 135</div>
								<hr />
								<div className='p-3 text-xl font-bold'>
									10번 방문시 아메리카노 무료
								</div>
								<hr />
								<div className='p-3 text-xl font-bold'>
									10번 방문시 포인트 3배
								</div>{" "}
								<hr />
							</StampGuideComment>
							<StampCoupon />
						</StampGuide>
					</StampGuideWrapper>
				</StampContentSetting>
			</StampPageContainer>
		</Layout>
	);
}
