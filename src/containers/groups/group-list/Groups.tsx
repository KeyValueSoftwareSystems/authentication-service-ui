import React from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GridColumns } from "@mui/x-data-grid";

import "./styles.css";
import { DELETE_GROUPS } from "./services/mutations";
import { GET_GROUPS, GET_GROUP_ROLES } from "./services/queries";
import TableList from "../../../components/table";
import { groupListAtom } from "../../../states/groupStates";
import TableChipElement from "../../../components/table-chip-element";

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
          props={params}
          query={GET_GROUP_ROLES}
          element="group"
        />
        </div>
      ),
      headerAlign: "center",
    },
  ];

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
      />
    </>
  );
};
export default GroupList;
