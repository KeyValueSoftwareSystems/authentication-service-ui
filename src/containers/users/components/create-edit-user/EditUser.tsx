import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  UPDATE_USER,
  UPDATE_USER_GROUPS,
  UPDATE_USER_PERMISSIONS,
} from "../../services/mutations";
import { GET_USER, GET_USER_GROUPS } from "../../services/queries";
import { userGroupsAtom } from "../../../../states/groupStates";
import { EditUserformSchema } from "../../userSchema";
import UserForm from "./UserForm";
import { UserPermissionsAtom } from "../../../../states/permissionsStates";
import { GET_GROUP_PERMISSIONS } from "../../../groups/services/queries";
import { userAtom } from "../../../../states/userStates";
import { getUniquePermissions } from "../../../../utils/permissions";
import "./styles.css";

const EditUser: React.FC = () => {
  const { id } = useParams();

  const userGroups = useRecoilValue(userGroupsAtom);
  const setUserGroups = useSetRecoilState(userGroupsAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [userPermissions, setUserPermissions] =
    useRecoilState(UserPermissionsAtom);
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS);
  const [updateUserPermissions] = useMutation(UPDATE_USER_PERMISSIONS);
  const navigate = useNavigate();

  useQuery(GET_USER, {
    variables: { id },
    onCompleted: (data) => {
      setUser(data?.getUser);
    },
  });

  useQuery(GET_USER_GROUPS, {
    variables: { id },
    onCompleted: (data) => {
      data?.getUserGroups.forEach((item: any) => {
        setUserGroups([...userGroups, item.id]); //rename to selectedGroupIds
      });
    },
  });

  const [getData] = useLazyQuery(GET_GROUP_PERMISSIONS);

  useEffect(() => {
    userGroups.forEach((group) => {
      getData({
        variables: { id: group },
        onCompleted: (data) => {
          //  if (
          //     !userPermissions.map((item: any) => item.groupId).includes(group)
          //   ) {
          setUserPermissions([
            ...userPermissions,
            { groupId: group, permissions: data?.getGroupPermissions },
          ]);
          // }
        },
      });
    });
  }, [userGroups]);

  const currentGroupIDs: string[] = userGroups;

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
          groups: userGroups,
        },
      },
    });

    updateUserPermissions({
      variables: {
        id: id,
        input: {
          permissions: getUniquePermissions(userPermissions),
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
    // password: user?.password,
  };

  return (
    <UserForm
      isEdit
      updateUser={onUpdateUser}
      initialValues={initialValues}
      userformSchema={EditUserformSchema}
      currentGroupIDs={currentGroupIDs}
    />
  );
};

export default EditUser;
