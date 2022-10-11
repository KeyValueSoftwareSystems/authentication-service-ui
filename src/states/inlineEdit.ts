import { atom } from "recoil";

export const inlineEditAtom = atom({
  key: "InlineEdit",
  default: true,
});

export const inlineAddAtom = atom({
  key: "InlineAdd",
  default: true,
});
