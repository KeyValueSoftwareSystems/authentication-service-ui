import React from "react";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../states/userStates";
import {
  UPDATE_USER,
  UPDATE_USER_GROUPS,
} from "./services/mutations";
import { GET_GROUPS, GET_USER, GET_USER_GROUPS } from "./services/queries";
import { groupListAtom, userGroupsAtom } from "../../states/groupStates";
import { EditUserformSchema } from "./userSchema";
import { ChecklistComponent } from "../../components/checklist/checkList";
import UserForm from "./UserForm";

const EditUser: React.FC = () => {
  const { id } = useParams();
  const setGroupList = useSetRecoilState(groupListAtom);
  const groupList = useRecoilValue(groupListAtom);
  const userGroupList = useRecoilValue(userGroupsAtom);
  const setUserGroup = useSetRecoilState(userGroupsAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);
  const currentGroupIDs: string[] = [];
  const navigate = useNavigate();

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  useQuery(GET_USER, {
    variables: { id },
    onCompleted: (data) => {
      setUser(data?.getUser);
    },
  });

  useQuery(GET_USER_GROUPS, {
    variables: { id },
    onCompleted: (data) => {
      data?.getUserGroups.map((item: any) =>
        setUserGroup([...userGroupList, item.id])
      );
    },
  });

  userGroupList.map((item) => currentGroupIDs.push(item));

  const onUpdateUser = (inputs: any) => {
    updateUser({
      variables: {
        id: id,
        input: {
          firstName: inputs.firstName,
          middleName: inputs.middleName,
          lastName: inputs.lastName,
        },
      },
    });

    updateUserGroups({
      variables: {
        id: id,
        input: {
          groups: userGroupList,
        },
      },
    });
    navigate("/home");
  };

  const initialValues = {
    firstName: user?.firstName,
    middleName: user?.middleName,
    lastName: user?.lastName,
    phone: user?.phone,
    email: user?.email,
    password: user?.password,
  };

  return (
    <div id="page">
       <UserForm
          isEdit
          updateUser={onUpdateUser}
          initialValues={initialValues}
          userformSchema={EditUserformSchema}
        />     
      <ChecklistComponent
        name="Select Groups"
        mapList={groupList}
        atomName={userGroupsAtom}
        currentIDs={currentGroupIDs}
      />
    </div>
  );
};

 
export default EditUser;
