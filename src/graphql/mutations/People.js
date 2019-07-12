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

const INVITE_PERSON_MUTATION = gql`
mutation inviteToConverge($email: String!) {
  inviteToConverge(email: $email) {
    email
  }
}
`;

export { UPDATE_ROLES_MUTATION as default, INVITE_PERSON_MUTATION };
