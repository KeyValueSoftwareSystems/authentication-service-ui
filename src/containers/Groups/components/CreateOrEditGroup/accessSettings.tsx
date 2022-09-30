import { useQuery } from "@apollo/client";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  List,
  ListItem,
  Grid,
  Paper,
  Checkbox,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { ChecklistComponent } from "../../../../components/checklist/checkList";
import { Role } from "../../../../types/role";
import {
  GET_ROLES,
  GET_ROLE_PERMISSIONS,
} from "../../../Roles/services/queries";
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
  const [roles, setRoles] = useState<Role[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data, loading, refetch } = useQuery(GET_ROLE_PERMISSIONS, {
    variables: { id: "fac3db38-a4c2-47e0-9458-9a9d44b91ed7" },
    onCompleted: (data) => {
      console.log(data?.getRolePermissions);
    },
  });

  const { data: roleData } = useQuery(GET_ROLES, {
    onCompleted: (data) => {
      console.log("roles", data?.getRoles);
    },
  });

  const onChange = () => {};

  return (
    <div className="access-settings">
      <div>Access Settings and Users</div>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Roles & Permissions" sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <div>
                <div className="header">Roles</div>
              </div>
              <ChecklistComponent
                mapList={roleData?.getRoles}
                name="Select roles"
                onChange={onChange}
              />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ marginLeft: 2 }} />
            <Grid item xs={5}>
              <div className="header">
                Permissions summary of selected roles
              </div>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
};

export default AccessSettings;
