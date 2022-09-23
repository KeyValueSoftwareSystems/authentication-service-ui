import {gql} from '@apollo/client';

export const LOGIN = gql`mutation 
passwordLogin ( $input : UserPasswordLoginInput!) {
    passwordLogin (input: $input)  {
    refreshToken,
    accessToken
  }
}`

export const GET_USER_GROUPS=gql`mutation($id:ID!){    
  getUserGroups(id: $id){
    id
    name
  }
}`;