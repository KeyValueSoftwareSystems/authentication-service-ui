import { gql } from "@apollo/client";

export const GET_GROUPS = gql`query
getGroups {
    getGroups {
        id,
        name
    }
}`

export const GET_GROUP_PERMISSIONS = gql`query
getGroupPermissions($id:ID!) {
    getGroupPermissions(id:$id) {
        id,
        name
    }
}`

