import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Tab, Tabs, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilState } from "recoil";

import GroupCard from "components/group-card/GroupCard";
import {
  IsViewEntitiesVerifiedAtom,
  IsViewGroupsVerifiedAtom,
  UserPermissionsAtom,
} from "states/permissionsStates";
import { GET_USER } from "../../services/queries";
import { User } from "types/user";
import { useParams } from "react-router-dom";
import "./styles.css";
import { CustomAvatar } from "components/custom-avatar/CustomAvatar";
import { TabPanel } from "../create-edit-user/UserForm";
import PermissionCards from "components/permission-cards/PermissionCards";
import { UPDATE_USER_PERMISSION } from "constants/permissions";
import If from "components/If/If";
import DisplayMessage from "components/display-message";
import { useCustomQuery } from "hooks/useQuery";
import {
  ACCESS_DENIED_DESCRIPTION,
  ACCESS_DENIED_MESSAGE,
  NO_GROUPS_DESCRIPTION,
  NO_GROUPS_MESSAGE,
  NO_PERMISSIONS_DESCRIPTION,
  NO_PERMISSIONS_MESSAGE,
} from "constants/messages";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditVerified, setEditVerified] = useState(true);
  const [isViewGroupsVerified] = useRecoilState(IsViewGroupsVerifiedAtom);
  const [isViewEntitiesVerified] = useRecoilState(IsViewEntitiesVerifiedAtom);
  const [userPermissions] = useRecoilState(UserPermissionsAtom);

  const [user, setUser] = useState<User>();
  const [value, setValue] = useState(0);
  const onBackNavigation = (e: React.MouseEvent<HTMLElement>) => {
    navigate(-1);
  };
  const onRedirectToEdit = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/home/users/add/${id}`);
  };

  useEffect(() => {
    if (userPermissions)
      userPermissions.forEach((item: any) => {
        if (item?.name.includes(UPDATE_USER_PERMISSION)) {
          setEditVerified(true);
        }
      });
  }, [userPermissions]);
  const onCompleted = (data: any) => {
    setUser(data?.getUser);
  };
  const { loading } = useCustomQuery(GET_USER, onCompleted, { id: id });
  const getClassName = () => {
    if (user?.status === "ACTIVE") return "active-user-style";
    else if (user?.status === "INACTIVE") return "inactive-user-style";
    else return "pending-style";
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="cntr">
      <div className="personal-details">
        <div className="details">
          <div style={{ display: "flex" }}>
            {!loading && (
              <CustomAvatar
                firstName={user?.firstName || ""}
                lastName={user?.lastName || ""}
                email={user?.email || ""}
              />
            )}
            <Chip
              label={
                user?.status &&
                user?.status.charAt(0) + user?.status.toLowerCase().slice(1)
              }
              className={getClassName()}
            />
          </div>
        </div>
        <Divider flexItem orientation="vertical" />
        <div className="contact">
          <div className="contact-number">Contact Number</div>
          <div>{user?.phone || "-"}</div>
        </div>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <Button
            variant="outlined"
            id="cancel-button"
            onClick={onBackNavigation}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <If condition={isEditVerified}>
            <div className="submit-buttom-style">
              <Button
                variant="contained"
                id="submit-button"
                onClick={onRedirectToEdit}
                sx={{ textTransform: "none" }}
              >
                Edit user
              </Button>
            </div>
          </If>
        </div>
      </div>
      <div className="group-details">
        <Box sx={{ height: "100%" }}>
          <Box sx={{ display: "flex" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              className="custom-tabs"
            >
              <Tab label="Groups" />
              <Tab label="Permissions" />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
            style={{ height: "125%", overflowY: "scroll" }}
          >
            {!loading ? (
              isViewGroupsVerified ? (
                user?.groups && (user?.groups).length > 0 ? (
                  <div id="groups-permissions">
                    <div id="user-groups">
                      {user?.groups?.map((item: any) => {
                        return (
                          <div style={{ marginTop: 15 }}>
                            <GroupCard
                              group={item}
                              showCheckBox={false}
                              isViewPage
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <DisplayMessage
                    customStyle={{ fontSize: 16 }}
                    altMessage={NO_GROUPS_MESSAGE}
                    image="./assets/nothing-to-show.png"
                    heading={NO_GROUPS_MESSAGE}
                    description={NO_GROUPS_DESCRIPTION}
                    imageStyles={{ width: "27%" }}
                    containerStyles={{ marginTop: "83px" }}
                  />
                )
              ) : (
                <DisplayMessage
                  customStyle={{ fontSize: 16 }}
                  altMessage={ACCESS_DENIED_MESSAGE}
                  image="./assets/access-denied.png"
                  heading={ACCESS_DENIED_MESSAGE}
                  description={ACCESS_DENIED_DESCRIPTION}
                  imageStyles={{ width: "33%" }}
                  className="access-denied-mini"
                />
              )
            ) : (
              <CircularProgress sx={{ top: "35%", marginTop: "225px" }} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {isViewEntitiesVerified ? (
              user?.permissions && (user?.permissions).length > 0 ? (
                <PermissionCards
                  userPermissions={user?.permissions}
                  isViewPage
                />
              ) : (
                <DisplayMessage
                  customStyle={{ fontSize: 16 }}
                  altMessage={NO_PERMISSIONS_MESSAGE}
                  image="./assets/no-permissions.png"
                  heading={NO_PERMISSIONS_MESSAGE}
                  description={NO_PERMISSIONS_DESCRIPTION}
                  imageStyles={{ width: "17%" }}
                  containerStyles={{ marginTop: "83px" }}
                />
              )
            ) : (
              <DisplayMessage
                customStyle={{ fontSize: 16 }}
                altMessage={ACCESS_DENIED_MESSAGE}
                image="./assets/access-denied.png"
                heading={ACCESS_DENIED_MESSAGE}
                description={ACCESS_DENIED_DESCRIPTION}
                imageStyles={{ width: "33%" }}
                className="access-denied-mini"
              />
            )}
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default UserDetails;
