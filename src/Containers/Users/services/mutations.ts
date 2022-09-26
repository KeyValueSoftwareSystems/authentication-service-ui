import { gql } from "@apollo/client"

export const CREATE_USER = gql`mutation 
passwordSignup ( $input : UserPasswordSignupInput!) {
    passwordSignup (input: $input)  {
    id,
    email,
    phone,
    firstName,
    middleName,
    lastName
  }
}`

export const UPDATE_USER = gql`mutation 
updateUser ( $id: ID!, $input : UpdateUserInput!) {
    updateUser (id:$id, input: $input)  {
    id,
    email,
    phone,
    firstName,
    middleName,
    lastName
  }
}`

export const UPDATE_USER_GROUPS = gql`mutation 
updateUserGroups($id: ID!, $input: UpdateUserGroupInput!){
  updateUserGroups(id:$id,input:$input){
      id,
      name
  }
}`