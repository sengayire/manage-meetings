import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { getToken } from '../utils/Cookie';
import introspectionQueryResultData from '../../fragmentTypes.json';

// Configure fragment matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});


// get mrm api link from environment variables
const { MRM_API_URL } = process.env || {};

// create a concatenatable http link for apollo
const httpLink = createHttpLink({
  uri: MRM_API_URL,
});

// append a token on each apollo request
const authHttpLink = setContext((_, { headers }) => {
  // read token from Cookies
  const token = getToken();
  // send token on each request
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const httpLinkWithAuthentication = authHttpLink.concat(httpLink);

// create the apollo client
const apolloClient = new ApolloClient({
  link: httpLinkWithAuthentication,
  cache: new InMemoryCache({ fragmentMatcher }),
});

export default apolloClient;
