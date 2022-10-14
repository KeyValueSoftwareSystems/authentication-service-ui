import { Permission } from "../types/permission";

// export const getUniquePermissions = (
//   permissions: RolePermissionsDetails[]
// ): string[] => {
//   debugger;
//   const groupPermissions: string[] = [];
//   permissions.map((permission: RolePermissionsDetails) =>
//     permission.rolePermissions.map((item: Permission) =>
//       groupPermissions.push(item.id)
//     )
//   );
//   const uniquePermissions: string[] = [];
//   groupPermissions.forEach((c: string) => {
//     if (!uniquePermissions.includes(c)) {
//       uniquePermissions.push(c);
//     }
//   });
//   return uniquePermissions;
// };


export const getUniquePermissions = (
  permissions : any
) => {

  const permissionsList: Permission[]= [];
  const ids: Array<string> = [];
  permissions?.forEach((item: any) => permissionsList.push(...item?.permissions) );
  permissionsList?.forEach((permission: any) => ids?.push(permission?.id)); 
  return [...Array.from(new Set(ids))];
};