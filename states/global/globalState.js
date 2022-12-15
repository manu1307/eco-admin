import { atom } from "recoil";

export const apiBaseAddressState = atom({
	key: "apiBaseAddressState",
	default: "https://ecomap.kr",
});
export const apiTokenState = atom({
	key: "apiTokenState",
	default: "",
});
export const storeListState = atom({
	key: "storeListState",
	default: [],
});
export const currentStoreState = atom({
	key: "currentStoreState",
	default: "",
});
