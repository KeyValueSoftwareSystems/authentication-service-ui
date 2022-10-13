import { atom } from "recoil";
import { GroupPermissionsDetails } from "../types/permission";
import { Permission } from "../types/user";

export const permissionsListAtom = atom<Permission[]>({
  key: "PermissionsList",
  default: [],
});

export const GroupPermissionsAtom = atom<Permission[]>({
  key: "GroupPermissionsList",
  default: [
  ],
});

export const UserPermissionsAtom = atom<GroupPermissionsDetails[]>({
  key: "UserPermissions",
  default: <any[]>([]),
});

export const RolePermissionsAtom = atom<Permission[]>({
  key: "RolePermissions",
  default: [
  ],
});
