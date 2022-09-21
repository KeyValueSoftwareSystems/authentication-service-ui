import * as React from "react";

import {
  styled,
  Box,
  Paper,
  Grid,
  Divider,
  Avatar,
  Link,
  Button,
  Chip,
} from "@mui/material";

import { TestProfileImg } from "../../Assets/Images";

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
            <Avatar
              src={TestProfileImg}
              sx={{ width: "90%", height: 400, marginBottom: 1 }}
            />
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "space-between",
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
                  }}
                >
                  TestName UMS
                </div>
                <Link underline="none" sx={{ fontSize: "14px" }}>
                  @TestTag
                </Link>
              </div>
              <Button
                variant="contained"
                sx={{
                  width: "50px",
                  height: "25px",
                  fontSize: "10px",
                  borderRadius: "20px",
                }}
              >
                Contact
              </Button>
            </div>
            <Divider flexItem />
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "90%",
              }}
            >
              <div>Based in</div>
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
              }}
            >
              <div>Roles</div>
              <div style={{ margin: "6px 0px 6px 2px" }}>
                {testRoles.map((role, index) => (
                  <Chip label={role} sx={{ marginRight: 2 }} />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <div>Role Groups</div>
              <div style={{ margin: "6px 0px 6px 2px" }}>
                {testRoles.map((role, index) => (
                  <Chip label={role} sx={{ marginRight: 2 }} />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <div>Permissions</div>
              <div style={{ margin: "6px 0px 6px 2px" }}>
                {testRoles.map((role, index) => (
                  <Chip label={role} sx={{ marginRight: 2 }} />
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
