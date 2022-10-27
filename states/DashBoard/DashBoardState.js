import { atom } from "recoil";

export const isFirstState = atom({
	key: "isFirstState",
	default: true,
});

// export const signUpSelector = selector({
// 	key: "signUpSelector",
// 	get: ({ get }) => {
// 		const id = get(idState);
// 		const password = get(passwordState);
// 		const passwordConfirm = get(passwordConfirmState);
// 		const name = get(nameState);
// 		const phoneNumber = get(phoneNumberState);
// 		const businessNumber = get(businessNumberState);
// 		const birthday = get(birthdayState);
// 		const gender = get(genderState);

// 		return {
// 			id,
// 			password,
// 			passwordConfirm,
// 			name,
// 			phoneNumber,
// 			businessNumber,
// 			birthday,
// 			gender,
// 		};
// 	},
// });
