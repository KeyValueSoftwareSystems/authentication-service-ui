import React, { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { Button } from "@mui/material";

import { permissionsListAtom } from "../../states/permissionsStates";
import {
  CREATE_PERMISSION,
  DELETE_PERMISSION,
  UPDATE_PERMISSION,
} from "./services/mutations";
import { GET_PERMISSIONS } from "./services/queries";
import InlineEdit from "../../components/inline-edit";
import { Permission } from "../../types/permission";
import "./styles.css";
import { apiRequestAtom, toastMessageAtom } from "../../states/apiRequestState";
import { VERIFY_USER_PERMISSION } from "../../components/table/services/queries";

const PermissionList: React.FC = () => {
  // eslint-disable-next-line
  const [apiSuccess, setApiSuccess] = useRecoilState(apiRequestAtom); // eslint-disable-next-line
  const [toastMessage, setToastMessage] = useRecoilState(toastMessageAtom);
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [isAddVerified, setAddVerified] = React.useState(true);
  const [permissionList, setPermissionList] =
    useRecoilState(permissionsListAtom);

  useQuery(VERIFY_USER_PERMISSION, {
    variables: {
      params: {
        permissions: ["create-permissions"],
        operation: "AND",
      },
    },
    onCompleted: (data) => {
      setAddVerified(data?.verifyUserPermission);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });

  const { refetch } = useQuery(GET_PERMISSIONS, {
    onCompleted: (data) => {
      setPermissionList(data?.getPermissions);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
  });

  const [deletePermission] = useMutation(DELETE_PERMISSION, {
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    onCompleted: () => {
      setToastMessage("Permission deleted successfully");
      setApiSuccess(true);
    },
  });

  const [updatePermission] = useMutation(UPDATE_PERMISSION, {
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    onCompleted: () => {
      setToastMessage("Permission updated successfully");
      setApiSuccess(true);
    },
  });

  const [createNewPermission] = useMutation(CREATE_PERMISSION, {
    update(cache, { data }) {
      const existingPermissionList: any = cache.readQuery({
        query: GET_PERMISSIONS,
      });
      const newPermissionList: Permission[] = [
        ...existingPermissionList?.getPermissions,
        data?.createPermission,
      ];
      cache.writeQuery({
        query: GET_PERMISSIONS,
        data: { getPermissions: newPermissionList },
      });
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    onCompleted: () => {
      setToastMessage("Permission created successfully");
      setApiSuccess(true);
    },
  });

  const onEditPermission = (
    value: string | undefined,
    id: string | undefined
  ) => {
    updatePermission({
      variables: {
        id,
        input: {
          name: value,
        },
      },
    });
  };

  const onDeletePermission = (id: string | undefined) => {
    if (id)
      deletePermission({
        variables: {
          id: id,
        },
        onCompleted: () => refetch(),
      });
    else setShowAddPermission(false);
  };

  const onCreatePermission = (value: string | undefined) => {
    setShowAddPermission(false);
    createNewPermission({
      variables: {
        input: {
          name: value,
        },
      },
    });
  };

  const createPermission = () => {
    setShowAddPermission(true);
  };

  const onCancelAdd = () => {
    setShowAddPermission(false);
  };

  return (
    <div className="permissionContainer">
      <div className="topContainer">
        <div className="heading"> Permissions </div>
        <Button
          variant="contained"
          onClick={createPermission}
          disabled={!isAddVerified}
        >
          Add
        </Button>
      </div>
      <div className="permissionList">
        <>
          {permissionList.map((permission: Permission) => (
            <InlineEdit
              value={permission?.name}
              id={permission?.id}
              key={permission?.id}
              onSave={onEditPermission}
              onDeletePermission={onDeletePermission}
              isAdd={false}
              onCancelAdd={onCancelAdd}
            />
          ))}
          {showAddPermission && (
            <InlineEdit
              onSave={onCreatePermission}
              onDeletePermission={onDeletePermission}
              isAdd
              onCancelAdd={onCancelAdd}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default PermissionList;
