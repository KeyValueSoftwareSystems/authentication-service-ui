import React from "react";
import { useRecoilState } from "recoil";
import { userListAtom } from "../../states/userStates";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_USER_GROUPS } from "./services/queries";
import {
  GridActionsCellItem,
  GridColumns,
  GridRowModesModel,
} from "@mui/x-data-grid";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import TableListing from "../../Components/Table/tableListing";

const Users: React.FC = () => {
  const [rowModesModel] = React.useState<GridRowModesModel>({});
  const [userList, setUserList] = useRecoilState(userListAtom);
  const columns: GridColumns = [
    {
      field: "firstName",
      headerName: "User",
      width: 230,
      headerClassName: "user-list-header",
    },
    {
      field: "groups",
      headerName: "Member Of",
      headerClassName: "user-list-header",
      width: 635,
      renderCell: (params) => <ShowGroupList {...params} />,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  // eslint - disable - next - line @typescript-eslint / no - unused - vars
  const {
    data: data1,
    loading,
    refetch,
  } = useQuery(GET_USERS, {
    onCompleted: (data1) => {
      setUserList(data1?.getUsers);
    },
  });

  let newUserList = userList.slice();
  console.log("newUserList", newUserList);
  return (
    <div>
      <div>
        <TableListing
          rows={userList}
          columns={columns}
          text="All Users"
          buttonlabel="Add User"
          searchlabel="Search User"
        />
      </div>
    </div>
  );
};

const ShowGroupList = (props: any) => {
  const { row } = props;
  console.log("rows=", row)
  const [groupList, setGroupList] = React.useState([]);

  const { data } = useQuery(GET_USER_GROUPS, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      setGroupList(data?.getUserGroups);
    },
  });
  console.log("groupList", groupList)
  return <>{groupList?.map((group: any) => <span className="groupsvalue"> {group?.name} </span>)}</>;
};

export default Users;
