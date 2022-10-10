import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import "./styles.css";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
} from "@mui/material";

import {
  GET_ROLES,
  GET_ROLE_PERMISSIONS,
} from "../../../roles/services/queries";
import {
  CREATE_GROUP,
  UPDATE_GROUP,
  UPDATE_GROUP_PERMISSIONS,
  UPDATE_GROUP_ROLES,
} from "../../services/mutations";
import { GET_GROUP_ROLES } from "../../services/queries";

import { getUniquePermissions } from "../../../../utils/permissions";

import GroupForm from "./GroupForm";
import { ChecklistComponent } from "../../../../components/checklist/checkList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const CreateOrEditGroup = () => {
  const [value, setValue] = useState(0);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [allRoles, setAllRoles] = useState<string[]>([]);

  const [updateGroup] = useMutation(UPDATE_GROUP);
  const [createGroup, { data: createGroupData }] = useMutation(CREATE_GROUP);
  const [updateGroupRoles] = useMutation(UPDATE_GROUP_ROLES);
  const [updateGroupPermissions] = useMutation(UPDATE_GROUP_PERMISSIONS);

  const { id } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [getData, { data: rolePermissions, loading, refetch }] =
    useLazyQuery(GET_ROLE_PERMISSIONS);

  const { data: roleData } = useQuery(GET_ROLES, {
    onCompleted: (data) => {
      const roleIds = data?.getRoles.map((role: any) => role.id);
      setAllRoles([...roleIds]);
    },
  });

  const { data: groupRoles, loading: groupRolesloading } = useQuery(
    GET_GROUP_ROLES,
    {
      skip: !id,
      variables: { id: id },
      onCompleted: (data) => {
        const groupRoleIds = data?.getGroupRoles?.map((item: any) => item.id);
        setRoles([...roles, ...groupRoleIds]);
      },
    }
  );

  const removeItem = (item: string) => {
    const itemIndex = roles.findIndex((e: any) => e === item);
    setRoles([...roles.slice(0, itemIndex), ...roles.slice(itemIndex + 1)]);
    const permissionIndex = permissions.findIndex(
      (e: any) => e.roleId === item
    );
    setPermissions([
      ...permissions.slice(0, permissionIndex),
      ...permissions.slice(permissionIndex + 1),
    ]);
  };

  const onChange = (event: any, item?: any) => {
    const value = event.target.value;
    if (event.target.checked) {
      if (value === "all") {
        setRoles(allRoles);
        return;
      }
      getData({
        variables: { id: item.id },
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
          setPermissions([
            ...permissions,
            { roleId: item.id, permissions: data?.getRolePermissions },
          ]);
        },
      });
      if (roles[0] === null) {
        setRoles([item.id]);
      } else {
        setRoles([...roles, item.id]);
      }
    } else {
      if (value === "all") {
        setRoles([]);
        return;
      }
      removeItem(item.id);
    }
  };
  console.log("permissions", permissions);
  console.log("roles", roles);

  const onCreateGroup = (inputs: any) => {
    createGroup({
      variables: {
        input: inputs,
      },
    });
  };

  useEffect(() => {
    if (createGroupData) {
      updateGroupRoles({
        variables: {
          id: createGroupData?.createGroup?.id,
          input: { roles: roles },
        },
      });

      updateGroupPermissions({
        variables: {
          id: createGroupData?.createGroup?.id,
          input: { permissions: getUniquePermissions(permissions) },
        },
      });
    }
  }, [createGroupData]);

  const onEditGroup = (inputs: any) => {
    updateGroup({
      variables: {
        id: id,
        input: inputs,
      },
    });

    updateGroupRoles({
      variables: {
        id: id,
        input: { roles: roles },
      },
    });

    updateGroupPermissions({
      variables: {
        id: id,
        input: { permissions: getUniquePermissions(permissions) },
      },
    });
  };

  // useEffect(() => {
  //   if (permissions.length != roles.length)
  //     roles.map((role) => {
  //       getData({
  //         variables: { id: role },
  //         onCompleted: (data) => {
  //           if (permissions[0]?.roleId === "") {
  //             setPermissions([
  //               { roleId: role, permissions: data?.getRolePermissions },
  //             ]);
  //           } else if (
  //             permissions.map((item: any) => item.roleId).includes(role) ===
  //             false
  //           ) {
  //             setPermissions([
  //               ...permissions,
  //               { roleId: role, permissions: data?.getRolePermissions },
  //             ]);
  //           }
  //         },
  //       });
  //     });
  // }, [roles]);

  return (
    <div className="access-settings">
      <GroupForm createGroup={onCreateGroup} editGroup={onEditGroup} />
      <div>Access Settings and Users</div>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Roles & Permissions" sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={1}>
            <Grid item xs={10} lg={5}>
              <div>
                <div className="header">Roles</div>
              </div>
              {!groupRolesloading && (
                <ChecklistComponent
                  mapList={roleData?.getRoles}
                  currentCheckedItems={roles}
                  name="Select roles"
                  onChange={onChange}
                />
              )}
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ marginLeft: 2 }} />
            <Grid item xs={10} lg={5} sx={{ paddingLeft: 5 }}>
              <div className="header">
                Permissions summary of selected roles
              </div>
              <List sx={{ listStyleType: "disc", paddingLeft: 5 }}>
                {permissions?.map((permission, index) =>
                  permission?.permissions?.map((item: any, index: any) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: "list-item",
                      }}
                    >
                      {item.name}
                    </ListItem>
                  ))
                )}
              </List>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
};

export default CreateOrEditGroup;
