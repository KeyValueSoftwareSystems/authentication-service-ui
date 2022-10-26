import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GridColumns, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

import "./styles.css";
import { DELETE_GROUP } from "../../services/mutations";
import { GET_GROUPS } from "../../services/queries";
import TableList from "../../../../components/table";
import { groupListAtom } from "../../../../states/groupStates";
import TableChipElement from "../../../../components/table-chip-element";
import Toast from "../../../../components/toast";

const GroupList: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [message, setMessage] = useState<string>();

  useMutation(DELETE_GROUP, {
    refetchQueries: [{ query: GET_GROUPS }],
  });
  const [groupList, setGroupList] = useRecoilState(groupListAtom);

  useEffect(() => {
    if (state?.message) {
      setMessage(state.message);
    }
  }, [state]);

  useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
    fetchPolicy: "network-only",
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
          <TableChipElement rowItems={params} columnName="roles" />
        </div>
      ),
      headerAlign: "center",
    },
  ];

  const onGroupClick = (params: GridRowParams) => {
    navigate(`./${params.id}`);
  };

  const onAddGroup = () => {
    navigate("add");
  };

  const onEditGroup = (id: GridRowId) => {
    navigate(`edit/${id}`);
  };

  const onCloseToast = () => {
    setMessage("");
  };

  return (
    <>
      <TableList
        rows={groupList}
        columns={columns}
        text="All Groups"
        buttonLabel="Add Group"
        searchLabel="Search Group"
        deleteMutation={DELETE_GROUP}
        refetchQuery={GET_GROUPS}
        onAdd={onAddGroup}
        onEdit={onEditGroup}
        handleRowClick={onGroupClick}
      />

      <Toast
        message={message}
        isOpen={Boolean(message)}
        handleClose={onCloseToast}
      />
    </>
  );
};
export default GroupList;
