import gql from 'graphql-tag';

const UPDATE_QUESTION_MUTATION = gql`
mutation updateQuestion($isActive: Boolean, $questionId: Int!){
  updateQuestion(isActive: $isActive, questionId: $questionId){
    question {
      question
      isActive
    }
  }
}
`;

export { UPDATE_QUESTION_MUTATION as default };
