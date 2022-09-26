import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { atom, selector } from "recoil";

export const groupListAtom = atom ({
    key: "GroupList",
    default : [{
      id:"",
      name:""}],
  });

  export const userGroupsAtom = atom ({
    key: "userGroupList",
    default : [""],
  });

  export const currentUserGroups = atom({
    key:"currentGroups",
    default: [
      { id:"",
        name:""
      }
    ]
  });

  export const currentGroupSelector = selector({
    key:"setCurrentGroups",
    get: ({get}) => {
      }
    }
  )


