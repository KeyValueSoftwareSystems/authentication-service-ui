import { useState } from "react";

import { useQuery } from "@apollo/client";

import {
  styled,
  Box,
  Paper,
  Grid,
  Divider,
  Link,
  Chip,
} from "@mui/material";

import {
  GET_USER,
  GET_USER_GROUPS,
} from "../../containers/Users/services/queries";
import { User, Group } from "../../types/user";

const Item = styled(Paper)(() => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [userGroups, setUserGroups] = useState<Group[]>();

  const { data, loading, refetch } = useQuery(GET_USER, {
    //Replace with userId
    variables: { id: "324a43e0-e919-4394-b171-a8a2e3c72807" },
    onCompleted: (data) => {
      setUser(data?.getUser);
    },
  });

  const {
    data: groupsData,
    loading: groupsLoading,
    refetch: groupsRefetch,
  } = useQuery(GET_USER_GROUPS, {
    //Replace with userId
    variables: { id: "324a43e0-e919-4394-b171-a8a2e3c72807" },
    onCompleted: (data) => {
      setUserGroups(data?.getUserGroups);
    },
  });

  const testRoles = [
    "admin",
    "test",
    "dev",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={4}>
          <Item
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    width: "fit-content",
                  }}
                >
                  {`${user?.firstName}
                   ${user?.middleName || ""} 
                  ${user?.lastName || ""}`}
                </div>
                <Link underline="none" sx={{ fontSize: "14px" }}>
                  {user?.email}
                </Link>
              </div>
            </div>
            <Divider flexItem />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "90%",
                marginTop: 10,
              }}
            >
              <div>Contact No:</div>
              <div>{user?.phone}</div>
            </div>
          </Item>
        </Grid>
        <Divider orientation="vertical" flexItem light />
        <Grid item xs={7}>
          <Item sx={{ display: "flex", flexDirection: "column" }} elevation={0}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
                marginBottom: 4,
              }}
            >
              <div>Roles</div>
              <div style={{ margin: "6px 0px 6px 2px" }}>
                {testRoles.map((role, index) => (
                  <Chip
                    label={role}
                    sx={{ marginRight: 2, marginBottom: 1 }}
                    key={index}
                    color="primary"
                  />
                ))}
              </div>
            </div>
            <Divider flexItem />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <div>Role Groups</div>
              <div style={{ margin: "6px 0px 6px 2px" }}>
                {testRoles.map((role, index) => (
                  <Chip
                    label={role}
                    sx={{ marginRight: 2, marginBottom: 1 }}
                    key={index}
                    color="primary"
                  />
                ))}
              </div>
            </div>
            <Divider flexItem />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <div>Permissions</div>
              <div style={{ margin: "6px 0px 6px 2px" }}>
                {userGroups?.map((group, index) => (
                  <Chip
                    label={group?.name}
                    sx={{ marginRight: 2, marginBottom: 1 }}
                    key={index}
                    color="primary"
                  />
                ))}
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
