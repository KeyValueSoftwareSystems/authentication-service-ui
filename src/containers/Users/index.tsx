import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { tableListAtom, userListAtom } from "../../states/userStates";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_USER_GROUPS } from "./services/queries";
// import TableListing from "../../Components/Table/tableListing";
import {
  GridActionsCellItem,
  GridColumns,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import TableListing from "../../components/Table/tableListing";


// const groupvalues = [
//   ['aaa', 'bbb'],
//   ['ccc', 'ddd', 'eee'],
//   ['fff', 'ggg', 'hhh', 'iii'],
//   ['ccc', 'ddd', 'eee'],
//   ['aaa', 'bbb'],
//   ['fff', 'ggg', 'hhh', 'iii'],
//   ['aaa', 'bbb'],
//   ['ccc', 'ddd', 'eee'],
//   ['ccc', 'ddd', 'eee'],
//   ['fff', 'ggg', 'hhh', 'iii', 'kkk']
// ];

// let i: number;
const arr: any[] = [];
// const initialRows: GridRowsProp = [
//   {
//     id: "",
//     firstName: "",
//     actions: ["Edit", "Delete", "Add to Group"]
//   },
// ];
const Users: React.FC = () => {
  const [rowModesModel] = React.useState<GridRowModesModel>({});

  const [userList, setUserList] = useRecoilState(userListAtom);
  // const [tableList, setTableList] = useRecoilState(tableListAtom);

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
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
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

  // const { data:data2 } = useQuery(GET_USER_GROUPS);
  // console.log("data2",data2)

  console.log("data1", data1?.getUsers);

  console.log("hi", userList);

  useEffect(() => {
    userList.map((user: any, i) => (arr[i] = user.firstName));
  }, [userList]);

  for (let j = 0; j < arr.length; j++) {
    console.log("array=", arr[j]);
  }

  let newUserList = userList.slice();
  console.log("newUserList", newUserList);
  return (
    <div>
      Users
      {userList.map((user: any, i) => (
        <div key={i}>{user.firstName}</div>
      ))}
      <Button variant="contained">Contained</Button>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
  const [groupList, setGroupList] = React.useState([]);

  const { data } = useQuery(GET_USER_GROUPS, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      // const g: any = [
      //   { id: "e8be89be-5495-44d8-a112-dd4bce29d6ac", name: "Admin" },
      //   { id: "e8be89be-5495-44d8-a112-dd4bce29d6ab", name: "Group2" },
      //   { id: "e8be89be-5495-44d8-a112-dd4bce29d6ak", name: "Group3" },
      // ];
      // setGroupList(g);
      setGroupList(data?.getUserGroups);
    },
  });

  return <>{groupList?.map((group: any) => <span className="groups"> {group?.name} </span>)}</>;
};

export default Users;
