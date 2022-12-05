import { ApolloError, useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { groupDetailsAtom } from "../../../../states/groupStates";
import { GroupPermissionsAtom } from "../../../../states/permissionsStates";
import { GroupRolesAtom } from "../../../../states/roleStates";
import {
  GET_GROUP,
  GET_GROUP_PERMISSIONS,
  GET_GROUP_ROLES,
} from "../../services/queries";
import "./styles.css";
import {
  apiRequestAtom,
  toastMessageAtom,
} from "../../../../states/apiRequestState";

const GroupDetails: React.FC = () => {
  const { id } = useParams();
  const [group, setGroup] = useRecoilState(groupDetailsAtom);
  const [roles, setRoles] = useRecoilState(GroupRolesAtom);
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const setToastMessage = useSetRecoilState(toastMessageAtom);
  const [permissions, setPermissions] = useRecoilState(GroupPermissionsAtom);
  const navigate = useNavigate();

  const { loading } = useQuery(GET_GROUP, {
    variables: { id },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setGroup(data?.getGroup);
      setRoles(data?.getGroup?.roles);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
  });

  useQuery(GET_GROUP_PERMISSIONS, {
    variables: { id },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setPermissions(data?.getGroupPermissions);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
  });

  const onBackNavigation = () => {
    navigate("/home/groups");
  };

  return (
    <div id="group-details">
      <div id="back-page" onClick={onBackNavigation}>
        <ArrowBackIcon id="arrowicon" />
        Groups
      </div>
      <legend id="group-title"> {group.name} </legend>
      <div id="rolesandpermissions">
        {!loading && (
          <>
            <div id="roles">
              <legend id="bold"> Group Roles </legend>
              <div id="item-list-details">
                {roles?.map((item) => (
                  <Chip id="item" key={item.id} label={item.name} />
                ))}
              </div>
            </div>
            <div id="roles">
              <legend id="bold"> Group Permissions </legend>
              <div id="item-list-details">
                {permissions?.map((item) => (
                  <Chip id="item" key={item.id} label={item.name} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
