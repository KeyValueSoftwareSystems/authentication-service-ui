import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { atom } from "recoil";

export const groupListAtom = atom({
  key: "GroupList",
  default: [
    {
      id: "",
      name: "",
    },
  ],
});

export const userGroupsAtom = atom({
  key: "userGroupList",
  default: [""],
});

export const groupDetailsAtom = atom ({
  key:"GroupDetails",
  default:{
      id:"",
      name:""}
})