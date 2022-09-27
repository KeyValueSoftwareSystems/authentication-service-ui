import { atom } from "recoil";

export const permissionsListAtom = atom ({
    key: "PermissionsList",
    default : [],
  });

  export const GroupPermissionsAtom= atom ({
    key: "GroupPermissions",
    default : [{
      id:"",
      name:""
    }],
  });
  
