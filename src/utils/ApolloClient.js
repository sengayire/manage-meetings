import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getItemFromLocalStorage } from './Utilities';
import Constants from './Constants';

// get mrm api link from environment variables
const { MRM_API_URL } = process.env || {};

// create a concatenatable http link for apollo
const httpLink = createHttpLink({
  uri: MRM_API_URL,
});

// append a token on each apollo request
const authHttpLink = setContext((_, { headers }) => {
  // read token from localStorage
  const token = getItemFromLocalStorage(Constants.MRM_TOKEN);

  // send token on each request
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const httpLinkWithAuthentication = authHttpLink.concat(httpLink);

// create the apollo client
const apolloClient = new ApolloClient({
  link: httpLinkWithAuthentication,
  cache: new InMemoryCache(),
});

export default apolloClient;
