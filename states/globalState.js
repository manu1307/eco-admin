import { atom } from "recoil";

export const apiBaseAddressState = atom({
  key: "apiBaseAddressState",
  default: "https://ecomap.kr",
});
export const apiTokenState = atom({
  key: "apiTokenState",
  default: "",
});
