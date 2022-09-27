import { List, ListItem, Grid, Paper, Checkbox } from "@mui/material";

const RolesAndPermissions = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <List style={{ maxHeight: "400px", overflow: "auto" }} >
          <ListItem>
            <Paper className="roles">
              <Checkbox />
              <div className="role">
                <div className="role-name">Academy Manager</div>
                <div className="role-description">
                  This groups is for managing the academy. The users in this
                  group will have access to all academy features including
                  Academy Admin and Surge Live. Users in this groups are the
                  point of contacts for any academy related queries and this is
                  a Test group.
                </div>
              </div>
            </Paper>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default RolesAndPermissions;
