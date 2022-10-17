import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation createGroup($input: NewGroupInput!) {
    createGroup(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_GROUP_ROLES = gql`
  mutation updateGroupRoles($id: ID!, $input: UpdateGroupRoleInput!) {
    updateGroupRoles(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_GROUP_PERMISSIONS = gql`
  mutation updateGroupPermissions(
    $id: ID!
    $input: UpdateGroupPermissionInput!
  ) {
    updateGroupPermissions(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_GROUPS = gql`
  mutation ($id: ID!) {
    deleteGroups(id: $id) {
      id
      name
    }
  }
`;
