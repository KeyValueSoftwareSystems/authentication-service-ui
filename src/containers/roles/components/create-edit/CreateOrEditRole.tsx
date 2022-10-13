import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChecklistComponent } from "../../../../components/checklist/checkList";
import { NewRole } from "../../../../types/role";
import { GET_PERMISSIONS } from "../../../permissions/services/queries";
import {
  CREATE_ROLE,
  UPDATE_ROLE,
  UPDATE_ROLE_PERMISSIONS,
} from "../../services/mutations";
import { GET_ROLE_PERMISSIONS } from "../../services/queries";
import RoleForm from "./RoleForm";
import "./styles.css";

const CreateOrEditRole = () => {
  const { id } = useParams();
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [allPermissions, setAllPermissions] = useState<string[]>([]);

  const [createRole, { data: createRoleData }] = useMutation(CREATE_ROLE);
  const [updateRole] = useMutation(UPDATE_ROLE);
  const [updateRolePermissions] = useMutation(UPDATE_ROLE_PERMISSIONS);

  const { data: permissionsData } = useQuery(GET_PERMISSIONS, {
    onCompleted: (data) => {
      const permissionIds = data?.getPermissions.map(
        (permission: any) => permission.id
      );
      setAllPermissions([...permissionIds]);
    },
  });

  const { data: rolePermissionsData, loading } = useQuery(
    GET_ROLE_PERMISSIONS,
    {
      skip: !id,
      variables: { id: id },
      onCompleted: (data) => {
        const permissionIds = data?.getRolePermissions?.map(
          (permission: any) => permission.id
        );
        setRolePermissions([...permissionIds]);
      },
    }
  );

  const removeItem = (item: string) => {
    const itemIndex = rolePermissions.findIndex((e: string) => e === item);
    setRolePermissions([
      ...rolePermissions.slice(0, itemIndex),
      ...rolePermissions.slice(itemIndex + 1),
    ]);
  };

  const onChange = (event: any, item?: any) => {
    const value = event.target.value;
    if (event.target.checked) {
      if (value === "all") {
        console.log(allPermissions);
        setRolePermissions(allPermissions);
        return;
      } else if (rolePermissions[0] === null) {
        setRolePermissions([item.id]);
      } else {
        setRolePermissions([...rolePermissions, item.id]);
      }
    } else {
      if (value === "all") {
        setRolePermissions([]);
        return;
      }
      removeItem(item.id);
    }
  };

  useEffect(() => {
    if (createRoleData)
      updateRolePermissions({
        variables: {
          id: createRoleData?.createRole?.id,
          input: { permissions: rolePermissions },
        },
      });
  }, [createRoleData]);

  console.log("roleperm", rolePermissions);

  const onCreateRole = (inputs: NewRole) => {
    createRole({ variables: { input: inputs } });
  };
  const onEditRole = (inputs: NewRole) => {
    updateRole({ variables: { id: id, input: inputs } });
    updateRolePermissions({
      variables: {
        id: id,
        input: { permissions: rolePermissions },
      },
    });
  };
  return (
    <div>
      <RoleForm createRole={onCreateRole} editRole={onEditRole} />
      <div className="role-permissions">
        <div className="permission-header"> Permissions</div>
        {!loading && (
          <ChecklistComponent
            mapList={permissionsData?.getPermissions}
            name="Select Permissions"
            onChange={onChange}
            currentCheckedItems={rolePermissions}
          />
        )}
      </div>
    </div>
  );
};

export default CreateOrEditRole;
