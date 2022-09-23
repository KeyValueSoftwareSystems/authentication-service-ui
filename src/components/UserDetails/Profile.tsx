import * as React from "react";

import {
  styled,
  Box,
  Paper,
  Grid,
  Divider,
  Link,
  Button,
  Chip,
} from "@mui/material";

const Item = styled(Paper)(() => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

const testRoles = ["admin", "test", "dev"];

const Profile = () => {
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
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    width:"fit-content"
                  }}
                >
                  TestName UMS
                </div>
                <Link underline="none" sx={{ fontSize: "14px", marginTop: 1 }}>
                  @TestTag
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
              <div>8921379205</div>
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
                  <Chip label={role} sx={{ marginRight: 2 }} color="primary" />
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
                  <Chip label={role} sx={{ marginRight: 2 }} color="primary" />
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
                {testRoles.map((role, index) => (
                  <Chip label={role} sx={{ marginRight: 2 }} color="primary" />
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
