import React from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GridColumns, GridRowParams } from "@mui/x-data-grid";

import "./styles.css";
import { DELETE_GROUPS } from "./services/mutations";
import { GET_GROUPS } from "./services/queries";
import TableList from "../../../components/table";
import { groupListAtom } from "../../../states/groupStates";
import TableChipElement from "../../../components/table-chip-element";
import { useNavigate } from "react-router-dom";

const GroupList: React.FC = () => {
  useMutation(DELETE_GROUPS, {
    refetchQueries: [{ query: GET_GROUPS }],
  });
  const [groupList, setGroupList] = useRecoilState(groupListAtom);

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Groups",
      headerClassName: "user-list-header",
      headerAlign: "center",
      width: 280,
    },
    {
      field: "roles",
      headerName: "Roles",
      headerClassName: "user-list-header",
      flex: 0.5,
      renderCell: (params) => (
        <div className="role-list">
       <TableChipElement
            rowItems={params}
            columnName="roles"
          />
        </div>
      ),
      headerAlign: "center",
    },
  ];

  const navigate= useNavigate();
  const onGroupClick = (params:GridRowParams) => {
    navigate(`./${params.id}`);
  };
  
  const onAddGroup = () => {};

  const onEditGroup = () => {};

  return (
    <>
      <TableList
        rows={groupList}
        columns={columns}
        text="All Groups"
        buttonLabel="Add Group"
        searchLabel="Search Group"
        deleteMutation={DELETE_GROUPS}
        refetchQuery={GET_GROUPS}
        onAdd={onAddGroup}
        onEdit={onEditGroup}
        handleRowClick={onGroupClick}
      />
    </>
  );
};
export default GroupList;
