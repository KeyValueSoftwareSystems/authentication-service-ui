import { Group } from '@/types/group';
import { Permission } from '@/types/permission';
import { Role } from '@/types/role';
import { User } from '@/types/user';

export interface GetRoles {
  getRoles: {
    results: Role[];
    totalCount: number;
  };
}

export interface GetGroups {
  getGroup: Group;
}

export interface GetGroupPermissions {
  getGroupPermissions: Permission[];
}

export interface GetUsers {
  getUsers: { results: User[] };
}
