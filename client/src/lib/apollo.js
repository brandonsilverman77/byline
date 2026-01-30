import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
})

// Log errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

// Add CSRF token to all requests
const authLink = setContext((_, { headers }) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  console.log('CSRF Token:', csrfToken ? 'found' : 'MISSING')
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': csrfToken || '',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }
})

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
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
