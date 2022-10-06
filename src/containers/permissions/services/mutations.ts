import { gql } from "@apollo/client";

export const DELETE_PERMISSION = gql`
  mutation ($id: ID!) {
    deletePermission(id: $id) {
      id
    }
  }
`;

export const UPDATE_PERMISSION=gql`
mutation ($id:ID!
  $input:UpdatePermissionInput!
  ){
  updatePermission(id:$id input:$input){
    id
    name
  }
}
`
