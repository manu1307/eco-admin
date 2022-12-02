import axios from "axios";
import React from "react";
import DaumPostCode from "react-daum-postcode";
import { useRecoilState } from "recoil";
import {
	storeAddrDetailState,
	storeAddrDepth01State,
	storeAddrDepth02State,
	storeAddrDepth03State,
	storeAddrXCoordState,
	storeAddrYCoordState,
} from "../../states/StoreSetting/storeAddressState";

const Postcode = (props) => {
	const { changeOpen, changeAddress } = props;
	const [storeAddrDetail, setStoreAddrDetail] =
		useRecoilState(storeAddrDetailState);
	const [storeAddrDepth01, setStoreAddrDepth01] = useRecoilState(
		storeAddrDepth01State
	);
	const [storeAddrDepth02, setStoreAddrDepth02] = useRecoilState(
		storeAddrDepth02State
	);
	const [storeAddrDepth03, setStoreAddrDepth03] = useRecoilState(
		storeAddrDepth03State
	);
	const [storeAddrXCoord, setStoreAddrXCoord] =
		useRecoilState(storeAddrXCoordState);
	const [storeAddrYCoord, setStoreAddrYCoord] =
		useRecoilState(storeAddrYCoordState);
	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = "";

		if (data.addressType === "R") {
			if (data.bname !== "") {
				extraAddress += data.bname;
			}
			if (data.buildingName !== "") {
				extraAddress +=
					extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
		}
		changeOpen(false);
		changeAddress(fullAddress);
		console.log(data);
		console.log(data.sido);
		console.log(data.sigungu);
		console.log(data.bname);

		setStoreAddrDepth01(data.sido);
		setStoreAddrDepth02(data.sigungu);
		setStoreAddrDepth03(data.bname ? data.bname : data.bname1);
		setStoreAddrDetail(
			`${data.sido} ${data.sigungu} ${data.bname ? data.bname : data.bname1}`
		);
		console.log(
			`${data.sido} ${data.sigungu} ${data.bname ? data.bname : data.bname1}`
		);
		const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
			`${data.address}`
		)}`;
		axios({
			method: "get",
			url: url,
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
			},
		}).then((res) => {
			setStoreAddrXCoord(res.data.documents[0].x);
			setStoreAddrYCoord(res.data.documents[0].y);
		});
	};

	return (
		<div>
			<DaumPostCode className='w-full' autoClose onComplete={handleComplete} />
		</div>
	);
};
export default Postcode;
