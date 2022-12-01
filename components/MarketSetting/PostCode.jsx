import React from "react";
import DaumPostCode from "react-daum-postcode";

const Postcode = (props) => {
	const { changeOpen, changeAddress } = props;

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

		// e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
		changeOpen(false);
		changeAddress(fullAddress);
	};

	return (
		<div>
			<DaumPostCode className='w-full' autoClose onComplete={handleComplete} />
		</div>
	);
};
export default Postcode;
