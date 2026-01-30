import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Author: {
        keyFields: ['objectId'],
      },
      Category: {
        keyFields: ['objectId'],
      },
    },
  }),
})
