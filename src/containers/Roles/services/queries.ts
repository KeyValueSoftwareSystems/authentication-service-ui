import { gql } from "@apollo/client";

export const GET_ROLE_PERMISSIONS = gql`
  query getRolePermissions($id: ID!) {
    getRolePermissions(id: $id) {
      id
      name
    }
  }
`;