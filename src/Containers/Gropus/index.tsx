import React from "react";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { companyAtom } from "../../states/users";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import UserDetails from "../../Components/UserDetails/UserDetails";

const Groups: React.FC = () => {
  const [companies, setCompanies] = useRecoilState(companyAtom);

  return (
    <div style={{ background: "#d3d3d3" }}>
      Groups
      <Button variant="contained">Contained</Button>
      {companies.map((c) => (
        <div>{c.companyName}</div>
      ))}
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <UserDetails />
    </div>
  );
};

export default Groups;
