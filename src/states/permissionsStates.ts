import { atom } from "recoil";

export const permissionsListAtom = atom ({
    key: "PermissionsList",
    default : [],
  });

  export const GroupPermissionsAtom = atom ({
    key: "GroupPermissionsList",
    default : [{
      id:"",
      name:""
    }],
  });

  export const UserPermissionsAtom = atom ({
    key: "UserPermissionsList",
    default : [{
      groupId:"",
      permissions:[{
        id:"",
        name:""
      }]
    }],
  });