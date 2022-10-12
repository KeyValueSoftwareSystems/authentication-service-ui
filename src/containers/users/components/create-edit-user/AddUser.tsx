import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  CREATE_USER,
  UPDATE_USER_GROUPS,
  UPDATE_USER_PERMISSIONS,
} from "../../services/mutations";
import { groupListAtom, userGroupsAtom } from "../../../../states/groupStates";
import "./styles.css";
import { GET_GROUPS } from "../../../groups/services/queries";
import { UserPermissionsAtom } from "../../../../states/permissionsStates";
import UserForm from "./UserForm";
import { AddUserformSchema } from "../../userSchema";

const AddUser: React.FC = () => {
  const setGroupList = useSetRecoilState(groupListAtom);
  const userPermissions = useRecoilValue(UserPermissionsAtom);
  const userGroups = useRecoilValue(userGroupsAtom);
  const [createUser, { data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  const uniquePermissions: any = [];

  const getUniquePermissions = () => {
    userPermissions.map((item) =>
      item.permissions.map((e) => {
        if (!uniquePermissions.includes(e.id)) uniquePermissions.push(e.id);
      })
    );
    return uniquePermissions;
  };

  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);
  const [updateUserPermissions] = useMutation(UPDATE_USER_PERMISSIONS);

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
            groups: userGroups,
          },
        },
      });

      updateUserPermissions({
        variables: {
          id: data?.passwordSignup.id,
          input: {
            permissions: getUniquePermissions(),
          },
        },
      });
    }

    navigate("/home");
  };

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  };

  return (
    <UserForm
      createUser={onCreateUser}
      initialValues={initialValues}
      userformSchema={AddUserformSchema}
    />
  );
};

export default AddUser;
