import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query getGroup($id: ID!) {
    getGroup(id: $id){
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
