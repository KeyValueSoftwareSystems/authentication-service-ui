import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";


import TableToolBar from "../../components/table-toolbar";
import { permissionsListAtom } from "../../states/permissionsStates";
import { DELETE_PERMISSION, UPDATE_PERMISSION } from "./services/mutations";
import { GET_PERMISSIONS } from "./services/queries";
import "./permissionlist.css";
import { useState } from "react";
import Editable from "../../components/inline-edit/InlineEdit";
import Try from "../../components/try";


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
  const [updatePermission]=useMutation(UPDATE_PERMISSION, {refetchQueries: [{ query: GET_PERMISSIONS }]})
  return (
    <>
      <TableToolBar
        text="All Permissions"
        searchLabel="Search Permissions"
        buttonLabel="Add Permission"
      />
      <ul className="permission-list">
        {permissionList?.map((permission: any) => (
          <>
            <li className="list-elements">
              <Editable
                type="input"
                deleteItem={deletePermission}
                item={permission}
                text="hi"
                placeholder={permission?.name}
              >
              <Try placeholder={permission?.name} api={updatePermission} id={permission?.id}/>
              </Editable>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};
export default PermissionList;
