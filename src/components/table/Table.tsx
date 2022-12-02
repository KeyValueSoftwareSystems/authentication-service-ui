import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import { Tooltip } from "@mui/material";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useSetRecoilState } from "recoil";

import { TableProps } from "./types";
import TableToolBar from "../table-toolbar/TableToolBar";
import "./styles.css";
import { VERIFY_USER_PERMISSION } from "./services/queries";
import { apiRequestAtom, toastMessageAtom } from "../../states/apiRequestState";
import {ReactComponent as EditIcon} from '../../assets/edit.svg'
import {ReactComponent as LineIcon} from '../../assets/line.svg'
import {ReactComponent as DeleteIcon} from '../../assets/trash.svg'
import DialogBox from "../dialog-box";

const TableList: FC<TableProps> = ({
  rows,
  columns,
  text,
  actionFlex,
  cursorType,
  setItemList,
  onAdd,
  onEdit,
  buttonLabel,
  searchLabel,
  deleteMutation,
  refetchQuery,
  editPermission,
  deletePermission,
  isAddVerified,
  handleRowClick,
  entity,
}) => {
  const [isEditVerified, setEditVerified] = React.useState(true);
  const [isDeleteVerified, setDeleteVerified] = React.useState(true);
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const setToastMessage = useSetRecoilState(toastMessageAtom);
  useQuery(VERIFY_USER_PERMISSION, {
    variables: {
      params: {
        permissions: [editPermission],
        operation: "AND",
      },
    },
    onCompleted: (data) => {
      setEditVerified(data?.verifyUserPermission);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });
  useQuery(VERIFY_USER_PERMISSION, {
    variables: {
      params: {
        permissions: [deletePermission],
        operation: "AND",
      },
    },
    onCompleted: (data) => {
      setDeleteVerified(data?.verifyUserPermission);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });

  const [open, setOpen] = useState(false);
  const [entityId, setEntityId] = useState<GridRowId>("");
  const [entityName, setEntityName] = useState<string>("");

  const openConfirmPopup = (id: GridRowId, name: string) => {
    setOpen(true);
    setEntityId(id);
    setEntityName(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteItem] = useMutation(deleteMutation, {
    refetchQueries: [{ query: refetchQuery }],
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    onCompleted: () => {
      setToastMessage(`${entity} deleted successfully`);
      setApiSuccess(true);
    },
  });

  const onConfirmDelete = () => {
    deleteItem({
      variables: {
        id: entityId,
      },
    });
    handleClose();
  };

  const action_column: GridColumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "table-list-header",
      flex: actionFlex,
      cellClassName: "actions",
      headerAlign: "center",

      getActions: (params) => {
        return [
          <>
            {isEditVerified && (
              <Tooltip title="Edit" arrow placement="top">
                <GridActionsCellItem
                  icon={
                    <><EditIcon
                    className="edit"
                      onClick={() => {
                        onEdit(params.id);
                      } 
                    } /><LineIcon
                        onClick={() => {
                          onEdit(params.id);
                        } } className="edit-line"/></>
                  }
                  label="Edit"
                  className="edit"
                  onClick={() => onEdit(params.id)}
                />
              </Tooltip>
            )}
            {isDeleteVerified && (
              <Tooltip title="Delete" arrow placement="top">
                <GridActionsCellItem
                  icon={<DeleteIcon className="delete" />}
                  label="Delete"
                  className="delete"
                  onClick={() => {
                    openConfirmPopup(
                      params.id,
                      params.row.name
                        ? params.row.name
                        : `${params.row.firstName} ${params.row.lastName}`
                    );
                  }}
                />
              </Tooltip>
            )}
            {open && (
              <DialogBox
                deleteMutation={deleteMutation}
                refetchQuery={refetchQuery}
                entity={entity}
                entityId={entityId}
                entityName={entityName}
                onConfirm={onConfirmDelete}
                handleClose={handleClose}
              />
            )}
          </>,
        ];
      },
    },
  ];
  let final_columns;
  if (!isEditVerified && !isDeleteVerified) {
    final_columns = columns;
  } else {
    final_columns = [...columns, ...action_column];
  }

  return (
    <div className="table-component">
        <TableToolBar
          text={text}
          buttonLabel={buttonLabel}
          searchLabel={searchLabel}
          setItemList={setItemList}
          searchQuery={refetchQuery}
          isAddVerified={isAddVerified}
          onAdd={onAdd}
        />
        <DataGrid
          rows={rows}
          columns={final_columns}
          style={{
            borderRadius: "0px 0px 5px 5px",
            cursor: cursorType,
          }}
          disableSelectionOnClick
          onRowClick={handleRowClick}
          disableColumnMenu
        />
    </div>
  );
};
export default TableList;
