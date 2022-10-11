import { atom } from "recoil";

export const inlineEditAtom = atom({
  key: "InlineEdit",
  default: false,
});

export const inlineAddAtom = atom({
  key: "InlineAdd",
  default: false,
});
