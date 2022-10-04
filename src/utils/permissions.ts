export const getUniquePermissions = (permissions: any): string[] => {
  const groupPermissions: any = [];
  permissions.map((item: any) =>
    item.permissions.map((item: any) => groupPermissions.push(item.id))
  );
  const uniquePermissions: any = [];
  groupPermissions.forEach((c: any) => {
    if (!uniquePermissions.includes(c)) {
      uniquePermissions.push(c);
    }
  });
  return uniquePermissions;
};
