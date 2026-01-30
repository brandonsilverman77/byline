import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
})

// Add CSRF token to all requests
const authLink = setContext((_, { headers }) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': csrfToken || '',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
