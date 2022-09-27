import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import AddMembers from "./addMembers";
import RolesAndPermissions from "./rolesAndPermissions";
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AccessSettings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="access-settings">
      <div>Access Settings and Users</div>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Members in this group"
              sx={{ p: 0, textTransform: "none" }}
            />
            <Tab label="Roles & Permissions" sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AddMembers />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RolesAndPermissions />
        </TabPanel>
      </div>
    </div>
  );
};

export default AccessSettings;
