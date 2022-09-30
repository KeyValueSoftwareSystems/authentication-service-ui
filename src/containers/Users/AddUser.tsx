import React, { useEffect } from "react";
import "./styles.css";
import { useMutation, useQuery } from "@apollo/client";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_GROUPS,
} from "./services/mutations";
import { GET_GROUPS } from "./services/queries";
import { groupListAtom, userGroupsAtom } from "../../states/groupStates";
import { AddUserformSchema } from "./userSchema";
import { ChecklistComponent } from "../../components/checklist/checkList";
import UserForm from "./UserForm";
import {useNavigate} from "react-router-dom";

const AddUser: React.FC = () => {
  const setGroupList = useSetRecoilState(groupListAtom);
  const groupList = useRecoilValue(groupListAtom);
  const userGroupList = useRecoilValue(userGroupsAtom);
  const [createUser, { data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });
  
  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);

  const onCreateUser = (inputs: any) => {
    createUser({
      variables: {
        input: inputs,
      },
    });

    if (data) {
      updateUserGroups({
        variables: {
          id: data?.passwordSignup.id,
          input: {
            groups: userGroupList,
          },
        },
      });
    }

  navigate('/home');
}

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  };

  return (
    <div id="page">
      <UserForm createUser={onCreateUser} initialValues={initialValues} userformSchema={AddUserformSchema}/>
      <ChecklistComponent
        name="Select Groups"
        mapList={groupList}
        atomName={userGroupsAtom}
        currentIDs={[""]}
      />
    </div>
  );
};

export default AddUser;
