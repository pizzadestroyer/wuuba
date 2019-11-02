import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
mutation SignUp($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`