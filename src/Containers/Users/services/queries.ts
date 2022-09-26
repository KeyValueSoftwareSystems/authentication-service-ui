import { gql } from "@apollo/client";


export const GET_USER = gql`query
getUser ($id: ID!) {
    getUser(id:$id) {
        id,
        email,
        phone,
        firstName,
        middleName,
        lastName
    }
}`

export const GET_GROUPS = gql`query
getGroups {
    getGroups {
        id,
        name
    }
}`

export const GET_USER_GROUPS = gql`query
getUserGroups($id:ID!) {
    getUserGroups(id:$id) {
        id,
        name
    }
}`

