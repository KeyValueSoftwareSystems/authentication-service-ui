import React, { useEffect } from "react";
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
import { getUniquePermissions } from "../../../../utils/permissions";

const AddUser: React.FC = () => {

  const navigate = useNavigate();

  const setGroupList = useSetRecoilState(groupListAtom);
  const userPermissions = useRecoilValue(UserPermissionsAtom);
  const userGroups = useRecoilValue(userGroupsAtom);
  const [createUser, { error: createUserError, data }] =
    useMutation(CREATE_USER);

  useEffect(() => {
    if (data) updateUserInfo();
  }, [data]);

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });
  const [updateUserGroups, { error: groupUpdateError }] =
    useMutation(UPDATE_USER_GROUPS);
  const [updateUserPermissions, { error: permissionUpdateError }] = useMutation(
    UPDATE_USER_PERMISSIONS
  );

  const onCreateUser = (inputs: any) => {
    createUser({
      variables: {
        input: inputs,
      },
    });
  };

  const updateUserInfo = () => {
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
          permissions: getUniquePermissions(userPermissions),
        },
      },
      onCompleted: () => {
        if (!createUserError && !groupUpdateError && !permissionUpdateError)
          navigate("/home/users");
      },
    });
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
