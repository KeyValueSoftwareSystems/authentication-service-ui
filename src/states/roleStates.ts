import { atom } from "recoil";

export const RolesListAtom = atom ({
    key: "RolesList",
    default : [],
  });

export const GroupRolesAtom= atom ({
  key: "GroupRoles",
  default : [{
    id:"",
    name:""
  }],
});

