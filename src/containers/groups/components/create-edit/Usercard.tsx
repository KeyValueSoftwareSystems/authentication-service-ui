import { FC } from "react";
import { Avatar, Box, Card } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { stringAvatar } from "../../../../utils/table";
import "./styles.css";
import { User } from "../../../../types/user";
import { getFullName } from "../../../../utils/user";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  console.log(user);

  const fullName = getFullName(user.firstName, user.middleName, user.lastName);

  return (
    <Box sx={{ width: "80%" }}>
      <Card variant="outlined" className="user-card">
        <div className="card-content">
          <Avatar {...stringAvatar(fullName)} className="avatar" />
          <div style={{ textTransform: "capitalize" }}>{fullName}</div>
        </div>
        <CancelIcon
          sx={{
            fill: "#d9d9d9",
            height: 60,
            width: 30,
          }}
        />
      </Card>
    </Box>
  );
};

export default UserCard;
