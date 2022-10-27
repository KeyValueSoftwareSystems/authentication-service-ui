import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
  query getGroups {
    getGroups {
      id
      name
    }
  }
`;

export const GET_GROUP = gql`
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      users {
        id
        email
        phone
        firstName
        middleName
        lastName
      }
      roles {
        id
        name
      }
    }
  }
`;

export const GET_GROUP_PERMISSIONS = gql`
  query getGroupPermissions($id: ID!) {
    getGroupPermissions(id: $id) {
      id
      name
    }
  }
`;

export const GET_GROUP_ROLES = gql`
  query getGroupRoles($id: ID!) {
    getGroupRoles(id: $id) {
      id
      name
    }
  }
`;
