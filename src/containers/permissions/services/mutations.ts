

import {gql} from '@apollo/client';



export const DELETE_PERMISSION=gql`
mutation($id: ID!){
    deletePermission(id: $id){
      firstName
    }
  }`