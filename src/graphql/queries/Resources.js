import gql from 'graphql-tag';

export const GET_RESOURCES_QUERY = gql`
query resources ($page: Int!, $perPage: Int!) {
  allResources(
    page: $page,
    perPage: $perPage
  ) {
    resources{
      id
    name
    quantity
    roomId
    room {
      id
      name
    }
    }
  pages
  hasNext
  hasPrevious
  queryTotal
  }
}
`;

export { GET_RESOURCES_QUERY as default };
