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
  default: <string[]>[],
});

export const groupDetailsAtom = atom({
  key: "GroupDetails",
  default: {
    id: "",
    name: "",
  },
});
