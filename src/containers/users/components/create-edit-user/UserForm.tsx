import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { Button, Chip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  GET_GROUPS,
  GET_GROUP_PERMISSIONS,
} from "../../../groups/services/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import FormInputText from "../../../../components/inputText";
import { ChecklistComponent } from "../../../../components/checklist/CheckList";
import { GroupPermissionsDetails } from "../../../../types/permission";
import { GET_USER } from "../../services/queries";
import { User } from "../../../../types/user";

const UserForm = (props: any) => {
  const {
    isEdit,
    updateUser,
    createUser,
    userformSchema,
    currentGroupIDs,
    currentUserPermissions
  } = props;

  const {id} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const[userGroupIds,setUserGroupIds]= useState<String[]>([])
  const [userPermissions, setUserPermissions] =
    useState<GroupPermissionsDetails[]>([]);
  const [groupList,setGroupList] = useState<any[]>([]);

  useEffect(()=>{
    if(currentUserPermissions)
      setUserPermissions(currentUserPermissions);
  },[])

  const { loading } = useQuery(GET_USER, {
    skip: !id,
    variables: { id: id },
    onCompleted: (data) => {
      setUser(data?.getUser);
    },
  });
  
  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  useEffect(()=>{
    if(isEdit) setUserGroupIds(currentGroupIDs)
    console.log("fhjghf",currentGroupIDs)
  },[])
 
  const methods = useForm({
    resolver: yupResolver(userformSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitForm = (inputs: FieldValues) => {
    isEdit ? updateUser(inputs,userGroupIds,userPermissions) : createUser(inputs,userGroupIds,userPermissions);
  };

  const [getGroupPermissionsData] = useLazyQuery(GET_GROUP_PERMISSIONS);

  const removeGroup = (group: string) => {
    const itemIndex = userGroupIds.findIndex((e: any) => e === group);
    setUserGroupIds([
      ...userGroupIds.slice(0, itemIndex),
      ...userGroupIds.slice(itemIndex + 1),
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
      // if (!userGroupIds.map((group) => group).includes(group.id))
      setUserGroupIds([...userGroupIds, group.id]);
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
          {!loading && (
            <div id="form-row">
              <FormInputText
                name="firstName"
                label="First name*"
                type="text"
                className="fields"
                defaultText={user?.firstName}
              />
              <FormInputText
                name="middleName"
                label="Middle name"
                type="text"
                className="fields"
                defaultText={user?.middleName}
              />
              <FormInputText
                name="lastName"
                label="Last Name*"
                type="type"
                className="fields"
                defaultText={user?.lastName}
              />
            </div>
             )}
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
