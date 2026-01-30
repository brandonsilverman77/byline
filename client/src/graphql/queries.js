import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query GetCategories {
    app {
      categories {
        nodes {
          id
          label
          objectId
        }
      }
    }
  }
`

export const GET_AUTHORS = gql`
  query GetAuthors($search: String, $categories: [Int]) {
    app {
      authors(search: $search, categories: $categories) {
        nodes {
          id
          name
          objectId
          imageUrl
          twitterHandle
          bio
          subscribed
          domains {
            nodes {
              id
              host
            }
          }
        }
      }
    }
  }
`

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    app {
      user {
        id
        email
      }
    }
  }
`
