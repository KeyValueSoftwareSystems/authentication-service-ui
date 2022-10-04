import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChecklistComponent } from "../../../../components/checklist/checkList";
import { getUniquePermissions } from "../../../../utils/permissions";
import {
  GET_ROLES,
  GET_ROLE_PERMISSIONS,
} from "../../../Roles/services/queries";
import {
  CREATE_GROUP,
  UPDATE_GROUP,
  UPDATE_GROUP_PERMISSIONS,
  UPDATE_GROUP_ROLES,
} from "../../services/mutations";
import { GET_GROUP_ROLES } from "../../services/queries";
import CreateOrEditGroup from "./createOrEditGroup";
import "./styles.css";

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

const AccessSettings = () => {
  const [value, setValue] = useState(0);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);

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
    onCompleted: (data) => {},
  });

  const { data: groupRoles, loading: groupRolesloading } = useQuery(
    GET_GROUP_ROLES,
    {
      skip: !id,
      variables: { id: id },
      onCompleted: (data) => {
        const roleIds = data?.getGroupRoles?.map((item: any) => item.id);
        setRoles([...roles, ...roleIds]);
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
  const onChange = (event: any, item: any) => {
    console.log("event", event.target.checked);
    if (event.target.checked) {
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

  return (
    <div className="access-settings">
      <CreateOrEditGroup createGroup={onCreateGroup} editGroup={onEditGroup} />
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
                  currentIDs={roles}
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

export default AccessSettings;
