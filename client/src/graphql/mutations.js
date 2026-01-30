import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      app {
        user {
          id
          email
        }
      }
      errors
    }
  }
`

export const SUBSCRIBE_TO_AUTHOR = gql`
  mutation SubscribeToAuthor($input: SubscribeToAuthorInput!) {
    subscribeToAuthor(input: $input) {
      author {
        id
        objectId
        subscribed
      }
      errors
    }
  }
`
