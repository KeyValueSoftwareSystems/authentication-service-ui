import {gql} from '@apollo/client';

export const GET_USERS = gql`query
getUsers  {
    getUsers {
        id,
        email,
        firstName,
    }
}`

// export const GET_USER_GROUPS=gql`query getUsers{    
//     User{
//       id,
//       email,
//       firstName,
//       UserGroupResponse{
//         id,
//         name,
//       }
//     }
//   }`

export const GET_USER_GROUPS=gql`query($id:ID!){    
    getUserGroups(id: $id){
      id
      name
    }
  }`;