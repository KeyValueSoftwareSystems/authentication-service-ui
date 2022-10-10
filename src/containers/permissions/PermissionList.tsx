import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Button } from "@mui/material";

import { permissionsListAtom } from "../../states/permissionsStates";
import {
  CREATE_PERMISSION,
  DELETE_PERMISSION,
  UPDATE_PERMISSION,
} from "./services/mutations";
import { GET_PERMISSIONS } from "./services/queries";
import "./permissionlist.css";
import "../../components/table-toolbar/tabletoolbar.css";
import SearchBar from "../../components/search-bar";
import Sort from "../../components/sort";
import EditableListItem from "../../components/editable-list-item/EditableListItem";
import InlineEdit from "../../components/inline-edit/InlineEdit";
import { inlineAddAtom } from "../../states/inlineEdit";

const PermissionList: React.FC = () => {
  const [deletePermission] = useMutation(DELETE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
  });
  const [permissionList, setPermissionList] =
    useRecoilState(permissionsListAtom);
  useQuery(GET_PERMISSIONS, {
    onCompleted: (data) => {
      setPermissionList(data?.getPermissions);
    },
  });
  const [updatePermission] = useMutation(UPDATE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
  });
  const [createNewPermission] = useMutation(CREATE_PERMISSION, {
    refetchQueries: [{ query: GET_PERMISSIONS }],
  });
  const [checkAdd, setcheckAdd] = useState(false);
  const createPermission = () => {
    setcheckAdd(true);
  };
  return (
    <>
      <div className="table-toolbar">
        <legend className="legend-title">All Permissions</legend>
        <div className="sort-search-button">
          <div className="sort">
            <Sort />
          </div>
          <div className="search">
            <SearchBar searchLabel="Search Permission" />
          </div>
          <div className="toolbar-button">
            <Button variant="outlined" onClick={createPermission}>
              Add
            </Button>
          </div>
        </div>
      </div>
      <ul className="permission-list">
        {permissionList?.map((permission: any) => (
          <>
            <li className="list-elements">
              <EditableListItem
                type="input"
                deleteItem={deletePermission}
                item={permission}
                placeholder={permission?.name}
              >
                <InlineEdit
                  placeholder={permission?.name}
                  api={updatePermission}
                  id={permission?.id}
                  checkAdd
                  action="edit"
                />
              </EditableListItem>
            </li>
          </>
        ))}
        <li className="list-elements">
          {checkAdd ? (
            <>
              <InlineEdit
                placeholder="Enter new permission"
                api={createNewPermission}
                id=""
                checkAdd={checkAdd}
                action="add"
              />
            </>
          ) : (
            <>
              <div></div>
            </>
          )}
        </li>
      </ul>
    </>
  );
};
export default PermissionList;
