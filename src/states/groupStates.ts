import { atom } from "recoil";
import { Group } from "../types/group";

export const groupListAtom = atom({
  key: "GroupList",
  default: [],
});


