import { atom } from "recoil";
import {Permission} from "../types/permission";

export const permissionsListAtom = atom<Permission[]>({
  key: "PermissionsList",
  default: [],
});

export const GroupPermissionsAtom = atom({
  key: "GroupPermissions",
  default: [
    {
      id: "",
      name: "",
    },
  ],
});

export const RolePermissionsAtom = atom({
  key: "RolePermissions",
  default: [
    {
      id: "",
      name: "",
    },
  ],
});
