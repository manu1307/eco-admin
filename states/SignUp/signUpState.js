import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from "recoil";

export const signUpState = atom({
	key: "signUpState",
	default: {
		id: "",
		password: "",
		passwordConfirm: "",
		name: "",
	},
});

export const signUpSelector = selector({
	key: "signUpSelector",
	get: ({ get }) => {
		const signUp = get(signUpState);
	},
});
