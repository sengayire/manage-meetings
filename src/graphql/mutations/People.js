import gql from 'graphql-tag';

const UPDATE_ROLES_MUTATION = gql`
  mutation changeUserRole($email: String!, $roleId: Int!) {
    changeUserRole(email: $email, roleId: $roleId){
      user{
        id
        email
        name
        roles{
          id
          role
        }
      }
    }
  }
`;

export { UPDATE_ROLES_MUTATION as default };
