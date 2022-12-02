import { atom, selector } from "recoil";

export const storeAddrDetailState = atom({
	key: "storeAddrDetailState",
	default: "",
});
export const storeAddrDepth01State = atom({
	key: "storeAddrDepth01State",
	default: "",
});
export const storeAddrDepth02State = atom({
	key: "storeAddrDepth02State",
	default: "",
});
export const storeAddrDepth03State = atom({
	key: "storeAddrDepth03State",
	default: "",
});
export const storeAddrXCoordState = atom({
	key: "storeAddrXCoordState",
	default: "",
});
export const storeAddrYCoordState = atom({
	key: "storeAddrYCoordState",
	default: "",
});

export const storeAddrState = selector({
	key: "storeAddrState",
	get: ({ get }) => {
		const storeAddrDetail = get(storeAddrDetailState);
		const storeAddrDepth01 = get(storeAddrDepth01State);
		const storeAddrDepth02 = get(storeAddrDepth02State);
		const storeAddrDepth03 = get(storeAddrDepth03State);
		const storeAddrLatitude = get(storeAddrXCoordState);
		const storeAddrLongitude = get(storeAddrYCoordState);

		return {
			addrDetail: storeAddrDetail,
			addrDepth01: storeAddrDepth01,
			addrDepth02: storeAddrDepth02,
			addrDepth03: storeAddrDepth03,
			latitude: storeAddrLatitude,
			longitude: storeAddrLongitude,
		};
	},
});
