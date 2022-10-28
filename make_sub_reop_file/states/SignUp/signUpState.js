import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	atomFamily,
} from "recoil";

export const idState = atom({
	key: "idState",
	default: "",
});
export const passwordState = atom({
	key: "passwordState",
	default: "",
});
export const passwordConfirmState = atom({
	key: "passwordConfirmState",
	default: "",
});
export const nameState = atom({
	key: "nameState",
	default: "",
});
export const phoneNumberState = atom({
	key: "phoneNumberState",
	default: "",
});
export const businessNumberState = atom({
	key: "businessNumberState",
	default: "",
});
export const birthdayState = atom({
	key: "birthdayState",
	default: "",
});
export const genderState = atom({
	key: "genderState",
	default: "",
});

export const signUpSelector = selector({
	key: "signUpSelector",
	get: ({ get }) => {
		const id = get(idState);
		const password = get(passwordState);
		const passwordConfirm = get(passwordConfirmState);
		const name = get(nameState);
		const phoneNumber = get(phoneNumberState);
		const businessNumber = get(businessNumberState);
		const birthday = get(birthdayState);
		const gender = get(genderState);

		return {
			id,
			password,
			passwordConfirm,
			name,
			phoneNumber,
			businessNumber,
			birthday,
			gender,
		};
	},
});
