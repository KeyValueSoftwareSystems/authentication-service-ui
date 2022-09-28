import { atom } from "recoil";

export const userListAtom = atom({
  key: "UserList",
  default: [],
});

export const userAtom = atom({
  key: "User",
  default: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  },
});
