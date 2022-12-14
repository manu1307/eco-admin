import styled from "styled-components";
import ContentHeader from "../../components/UI/Content/ContentHeader";
import Layout from "../../components/UI/Layout/Layout";
import { useRef, useEffect, useState } from "react";
import StampCoupon from "../../components/ServiceSetting/Coupon";
import { useRecoilValue } from "recoil";
import {
	apiBaseAddressState,
	currentShopState,
	currentStoreState,
} from "../../states/global/globalState";
import axios from "axios";

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
	@media screen and (max-width: 640px) {
		flex-direction: column;
	}
`;
const SettingBox = styled.div`
	width: 420px;
	padding: 40px;
	background-color: #fafafa;
	border-radius: 5px;
	@media screen and (max-width: 640px) {
		width: 100%;
	}
`;
const ConfirmButton = styled.button`
	width: 220px;
	background-color: #121533;
	color: white;
	padding: 16px 20px;
	border-radius: 28px;
	@media screen and (max-width: 640px) {
		width: 100%;
	}
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
	@media screen and (max-width: 640px) {
		height: 270px;
		align-items: center;
	}
`;
const StampGuideComment = styled.div`
	width: 990px;
	padding: 20px 25px;
	@media screen and (max-width: 640px) {
		width: 250px;
	}
`;
// const StampGuideCoupon = styled.div``;
export default function Stamp() {
	const currentShop = useRecoilValue(currentShopState);
	const BASEURL = useRecoilValue(apiBaseAddressState);
	const [shopAddress, setShopAddress] = useState("");
	const [loginRole, setLoginRole] = useState("");

	// ?????? ?????? ????????????
	useEffect(() => {
		const shopId = localStorage.getItem("shopId");
		const token = localStorage.getItem("token");
		shopId &&
			axios({
				method: "get",
				url: `${BASEURL}/api/v1/shops/${shopId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				// console.log(res.data.data);
				setShopAddress(res.data.data.addr.trim());
			});
		setLoginRole(localStorage.getItem("role"));
	}, [BASEURL, currentShop, setShopAddress]);

	const [currentStamp, setCurrentStamp] = useState("tumbler");
	const secondCategory =
		currentStamp == "tumbler"
			? "????????? ????????? ??????"
			: currentStamp == "normal" && "?????? ????????? ??????";

	return (
		<Layout
			sideItems={[
				{ text: "?????? ????????? ??????", url: "/serviceSetting" },
				{ text: "?????? ??????", url: "/serviceSetting/menu" },
				{ text: "???????????? ??????", url: "/serviceSetting/closingsale" },
				{
					text: "?????????",
					url: "/serviceSetting/admin",
				},
				loginRole === "admin" && {
					text: "?????? ??????",
					url: "/serviceSetting/adminCode",
				},
			]}>
			<StampPageContainer>
				<ContentHeader
					firstCategory='????????? ??????'
					secondCategory={secondCategory}
				/>
				<StampButtonWrapper>
					<StampButton
						onClick={() => {
							setCurrentStamp("tumbler");
						}}>
						????????? ?????????
					</StampButton>
					<StampButton
						onClick={() => {
							setCurrentStamp("normal");
						}}>
						?????? ?????????
					</StampButton>
				</StampButtonWrapper>
				<StampContentSetting>
					<div className='font-bold text-lg mb-3'>????????? ?????? ??????</div>
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
										??????
									</div>
									<div style={{ color: "#00E1D4" }}>% ??????</div>
								</div>
								<div className='text-sm' style={{ color: "#2A3042" }}>
									10??? ?????? ??? ????????? *??? ??????
								</div>
							</div>
							<div>
								<input
									type='number'
									className='rounded-full px-5 mr-2 w-2/3 sm:w-1/2'
								/>
								<span>??? ??????</span>
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
										??????
									</div>
									<div style={{ color: "#00E1D4" }}>??? ??????</div>
								</div>
								<div className='text-sm' style={{ color: "#2A3042" }}>
									10??? ?????? ??? (????????????) ??????
								</div>
							</div>
							<div>
								<input
									type='text'
									className='rounded-full px-5 mr-2 w-2/3 sm:w-1/2'
								/>
								<span>??????</span>
							</div>
						</SettingBox>
						<div className='w-full sm:w-1/6 flex items-end'>
							<ConfirmButton>??????</ConfirmButton>
						</div>
					</SettingWrapper>
					<StampGuideWrapper>
						<div className='font-bold text-lg mb-3'>???????????? ?????? ?????????</div>
						<StampGuide>
							<StampGuideComment>
								<div className='p-3 text-sm'>{shopAddress && shopAddress}</div>
								<hr />
								<div className='p-3 text-xl font-bold'>
									10??? ????????? <br /> ??????????????? ??????
								</div>
								<hr />
								<div className='p-3 text-xl font-bold'>
									10??? ????????? <br /> ????????? 3???
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
