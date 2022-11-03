import { EntityPermissionsDetails, Permission } from "../types/permission";

export const getUniquePermissions = (permissions: any) => {
  const permissionsList: Permission[] = [];
  const ids: Array<string> = [];
  permissions?.forEach((item: any) =>
    permissionsList.push(...item?.permissions)
  );
  permissionsList?.forEach((permission: any) => ids?.push(permission?.id));
  return [...Array.from(new Set(ids))];
};

export const getOverallPermissions = (
  permissions: EntityPermissionsDetails[]
) => {
  const permissionsList = permissions.reduce((acc: Permission[], cur) => {
    acc.push(...cur.permissions);
    return acc;
  }, []);
  return [
    ...Array.from(
      new Set(permissionsList.map((permission: any) => permission.name))
    ),
  ];
};
