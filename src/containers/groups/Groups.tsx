import React from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GridColumns } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

import "./styles.css"
import { DELETE_GROUPS } from "./services/mutations";
import { GET_GROUPS, GET_GROUP_ROLES } from "./services/queries";
import TableList from "../../components/table";
import { groupListAtom } from "../../states/groupStates";


const Groups: React.FC = () => {

  const [deleteGroup, { data: data2 }] = useMutation(DELETE_GROUPS, {
    refetchQueries: [{ query: GET_GROUPS }]
  });


  const [groupList, setGroupList] = useRecoilState(groupListAtom);  

  const { data } = useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Groups",
      headerClassName: "user-list-header",
      headerAlign: "left",
      width:280,
    },
    {
      field: "roles",
      headerName: "Roles",
      headerClassName: "user-list-header",
      flex: 1,
      renderCell: (params) => <ShowRoleList {...params} />,
      headerAlign: "center",
    },
    
  ];

  return (
    <>
      <TableList
        rows={groupList}
        columns={columns}
        text="All Groups"
        buttonlabel="Add Group"
        searchlabel="Search Group"
        deleteMutation={DELETE_GROUPS}
        refetchQuery={GET_GROUPS}
      />
    </>
  );
};
const ShowRoleList = (props: any) => {
  const { row } = props;
  const [roleList, setRoleList] = React.useState([]);
  const { data } = useQuery(GET_GROUP_ROLES, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      setRoleList(data?.getGroupRoles);
    },
  });

  return (
    <>      
      {roleList?.map((role: any) => (
        <Chip label={role?.name} key={role.id} />          
      ))}
    </>
  );
};

export default Groups;
