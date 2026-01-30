import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query GetCategories {
    app {
      categories {
        nodes {
          id
          objectId
          label
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
          objectId
          name
          bio
          twitterHandle
          twitterProfileImageUrl
          imageUrl
          featured
          subscribed
          categoryIds
          domains {
            nodes {
              id
              objectId
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
        objectId
        email
        superadmin
      }
    }
  }
`
