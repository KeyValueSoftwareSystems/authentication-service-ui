import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Avatar, Chip } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import { Tooltip } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import {ReactComponent as RefreshIcon} from '../../assets/refresh.svg'
import {ReactComponent as ContentCopyIcon} from '../../assets/copy.svg'

import { GET_USERS } from "./services/queries";
import { REFRESH_INVITE_TOKEN } from "../auth/services/mutations";
import "./styles.css";
import { DELETE_USER } from "./services/mutations";
import { userListAtom } from "../../states/userStates";
import TableList from "../../components/table/Table";
import TableChipElement from "../../components/table-chip-element";
import { stringAvatar } from "../../utils/table";
import "./components/create-edit-user/styles.css";
import { UserPermissionsAtom } from "../../states/permissionsStates";
import { apiRequestAtom, toastMessageAtom } from "../../states/apiRequestState";
import {
  CREATE_USER_PERMISSION,
  DELETE_USER_PERMISSION,
  UPDATE_USER_PERMISSION,
} from "../../constants/permissions";

const Users: React.FC = () => {
  const [isAddVerified, setAddVerified] = React.useState(false);
  const [userPermissions] = useRecoilState(UserPermissionsAtom);
  const [userList, setUserList] = useRecoilState(userListAtom);
  const setToastMessage = useSetRecoilState(toastMessageAtom);
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const navigate = useNavigate();

  useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUserList(data?.getUsers);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });

  const onEdit = (id: any) => {
    navigate(`/home/users/add/${id}`);
  };

  const onAdd = () => {
    navigate(`/home/users/add`);
  };

  useEffect(() => {
    // eslint-disable-next-line
    userPermissions.map((item: any) => {
      if (item?.name.includes(CREATE_USER_PERMISSION)) {
        setAddVerified(true);
      }
    }); // eslint-disable-next-line
  }, []);

  const setItemList = (data: any) => {
    setUserList(data.getUsers);
  };

  const columns: GridColumns = [
    {
      field: "firstName",
      headerName: "Users",
      width: 320,
      headerClassName: "user-list-header",
      headerAlign: "left",
      renderCell: (params) => (
        <div className="username-column">
          <GetFullName {...params} />
        </div>
      ),
    },
    {
      field: "groups",
      headerName: "Groups",
      headerClassName: "user-list-header",
      flex: 0.5,
      renderCell: (params) => (
        <div className="group-list">
          <TableChipElement
            rowItems={params}
            columnName="groups"
            defaultSize={6}
          />
        </div>
      ),
      headerAlign: "left",
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.21,
      renderCell: (params) => (
        <div className="access-column">
          <CheckAccess {...params} />
        </div>
      ),
      headerAlign: "left",
      sortable: false,
      align: "center",
    },
  ];

  const onUserClick = (params: any) => {
    navigate(`./${params.id}`);
  };

  return (
    <>
      <TableList
        rows={userList}
        columns={columns}
        text="All Users"
        setItemList={setItemList}
        onAdd={onAdd}
        onEdit={onEdit}
        entity="User"
        buttonLabel="Add User"
        searchLabel="Search User"
        deleteMutation={DELETE_USER}
        refetchQuery={GET_USERS}
        handleRowClick={onUserClick}
        editPermission={UPDATE_USER_PERMISSION}
        deletePermission={DELETE_USER_PERMISSION}
        isAddVerified={!isAddVerified}
        actionFlex={0.23}
        cursorType="pointer"
      />
    </>
  );
};

const GetFullName = (props: any) => {
  const { row } = props;
  return (
    <>
      <Avatar
        {...stringAvatar(`${row.firstName} ${row.lastName}`?.toUpperCase())}
        className="avatar"
      />
      <div>
        <div className="fullname">{`${row.firstName} ${row.lastName}`}</div>
        <div className="email">{row.email}</div>
      </div>
    </>
  );
};

const CheckAccess = (props: any) => {
  const { row } = props;

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checked={row.status==="ACTIVE"?true:false}/>
  ))(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#0AAAA1',
          opacity: 1,
        },
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#CF1322',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const [isLinkCopied, setIsLinkCopied] = React.useState(false);
  const [isLinkRefreshed, setIsLinkRefreshed] = React.useState(false);

  const [refreshInviteToken, { data }] = useMutation(REFRESH_INVITE_TOKEN, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const onCopyInviteLink = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const inviteLink = `${process.env.REACT_APP_BASE_URL}/#/confirmpassword?token=${props.row.inviteToken}`;
    navigator.clipboard.writeText(inviteLink);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  const onRefreshInviteLink = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    refreshInviteToken({
      variables: { id: props.row.id },
    });
    setIsLinkRefreshed(true);
    setTimeout(() => {
      setIsLinkRefreshed(false);
    }, 2000);
  };

  return (
    <div className="toggle">
      {row.status !== "INVITED" && (
        <div className="switch">
           <FormControlLabel
           sx={row.status==="ACTIVE"?{color:"#0AAAA1"}:{color:"#CF1322"}}
        control={<IOSSwitch sx={{ m: 1 }} />}
        label={row.status==="ACTIVE"?"Active":"Inactive"}
        onClick={(e:any)=> e.stopPropagation()}
      />
        </div>
      )}
      <div className="invited-switch">
        {row.status === "INVITED" && (
          <>
            <Chip
              label="Invited"
              className="pending"
              sx={{
                height: "31px",
                width: "76px",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            />
            <Tooltip
              title={
                isLinkRefreshed
                  ? "Invite Link Refreshed!"
                  : "Refresh Invite Link"
              }
              onClick={onRefreshInviteLink}
              sx={{ cursor: "pointer" }}
            >
              <RefreshIcon className="refresh-token-icon"/>
            </Tooltip>
            <Tooltip
              title={isLinkCopied ? "Copied" : "Copy Invite Link"}
              onClick={onCopyInviteLink}
              sx={{ cursor: "pointer" }}
            >
              <ContentCopyIcon fontSize="small" className="refresh-token-icon"/>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
