import { gql } from "@apollo/client";

export const GET_GROUP_ROLES = gql`
  query ($id: ID!) {
    getGroupRoles(id: $id) {
      id
      name
    }
  }
`;
