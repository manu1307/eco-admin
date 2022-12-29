import { atom } from "recoil";

export const apiBaseAddressState = atom({
	key: "apiBaseAddressState",
	default: "https://ecomap.kr",
});
export const apiTokenState = atom({
	key: "apiTokenState",
	default: "",
});
export const shopListState = atom({
	key: "shopListState",
	default: [],
});
export const currentShopState = atom({
	key: "currentShopState",
	default: {},
});
export const loginRoleState = atom({
	key: "loginRoleState",
	default: "",
});
