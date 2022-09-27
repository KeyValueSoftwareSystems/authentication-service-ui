import { atom } from "recoil";


  export const userListAtom = atom ({
    key: "UserList",
    default : [],
  });


  export const tableListAtom=atom({
    key:"TableList",
    default : [],
  });

  // export const groupListAtom = atom ({
  //   key: "GroupList",
  //   default : [],
  // });

  export const roleListAtom = atom ({
    key: "RoleList",
    default : [],
  });

  