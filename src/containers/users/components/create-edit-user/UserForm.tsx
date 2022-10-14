import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Chip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { groupListAtom, userGroupsAtom } from "../../../../states/groupStates";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserPermissionsAtom } from "../../../../states/permissionsStates";
import {
  GET_GROUP_PERMISSIONS,
} from "../../../groups/services/queries";
import { useLazyQuery } from "@apollo/client";
import FormInputText from "../../../../components/inputText";
import { ChecklistComponent } from "../../../../components/checklist/CheckList";

const UserForm = (props: any) => {
  const {
    isEdit,
    updateUser,
    createUser,
    initialValues,
    userformSchema,
    currentGroupIDs,
  } = props;

  const navigate = useNavigate();
  const groupList = useRecoilValue(groupListAtom);
  const userGroups = useRecoilValue(userGroupsAtom);
  const setUserGroups = useSetRecoilState(userGroupsAtom);
  const [userPermissions, setUserPermissions] =
    useRecoilState(UserPermissionsAtom);

  const groups: string[] = [];
  groupList.map((item) => groups.push(item.id));

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(userformSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitForm = (inputs: any) => {
    isEdit ? updateUser(inputs) : createUser(inputs);
  };

  const [getGroupPermissionsData] = useLazyQuery(GET_GROUP_PERMISSIONS);

  const removeGroup = (group: string) => {
    const itemIndex = userGroups.findIndex((e: any) => e === group);
    setUserGroups([
      ...userGroups.slice(0, itemIndex),
      ...userGroups.slice(itemIndex + 1),
    ]);
    const permission_index = userPermissions.findIndex(
      (permission: any) => permission.groupId === group
    );

    setUserPermissions([
      ...userPermissions.slice(0, permission_index),
      ...userPermissions.slice(permission_index + 1),
    ]);
  };

  const addGroupPermissions = (permissions: any, item: string) => {
    // if (
    //   !userPermissions.map((item: any) => item.groupId).includes(item)
    // ) {
    setUserPermissions([
      ...userPermissions,
      { groupId: item, permissions: permissions },
    ]);
    // }
  };

  const handleChange = (event: any, group: any) => {
    if (event.target.checked) {
      // if (!userGroups.map((group) => group).includes(group.id))
      setUserGroups([...userGroups, group.id]);

      getGroupPermissionsData({
        variables: { id: group.id },
        onCompleted: (data) => {
          addGroupPermissions(data?.getGroupPermissions, group.id);
        },
      });
    } else {
      removeGroup(group.id);
    }
  };

  return (
    <div id="page">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div id="fixed">
            <div id="back-page">
              <ArrowBackIcon
                id="arrowicon"
                onClick={() => {
                  navigate("/home/users");
                }}
              />
              Users
            </div>

            <div id="title">
              <legend id="bold">{isEdit ? "Modify user" : "Add user"}</legend>
              <div id="add-cancel">
                <Button id="cancel">
                  <Link id="cancel" to="/home/users">
                    Cancel
                  </Link>
                </Button>
                <Button id="add" type="submit">
                  {isEdit ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>

          <div id="inputs">
            <div id="form-row">
              <FormInputText
                name="firstName"
                label="First name*"
                type="text"
                className="fields"
              />
              <FormInputText
                name="middleName"
                label="Middle name"
                type="text"
                className="fields"
              />
              <FormInputText
                name="lastName"
                label="Last Name*"
                type="type"
                className="fields"
              />
            </div>
            {!isEdit && (
              <div id="form-row">
                <FormInputText
                  name="email"
                  label="Email*"
                  type="text"
                  className="fields"
                />
                <FormInputText
                  name="phone"
                  label="Phone Number"
                  type="text"
                  className="fields"
                />
                <FormInputText
                  name="password"
                  label="Password*"
                  type="password"
                  className="fields"
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
      <div id="groups-permissions">
        <ChecklistComponent
          name="Select Groups"
          mapList={groupList}
          currentCheckedItems={currentGroupIDs}
          onChange={handleChange}
        />

        <div id="add-items">
          <div id="permission-header">
            <div> Permissions </div>
          </div>
          <div id="permission-list">
            {userPermissions?.map((group: any) => {
              return (
                <div key={group.groupId}>
                  {group?.permissions.map((item: any) => {
                    return <Chip id="item" key={item.id} label={item.name} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
