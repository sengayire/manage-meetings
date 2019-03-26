import gql from 'graphql-tag';

const UPDATE_QUESTION_STATUS_MUTATION = gql`
mutation updateQuestion($isActive: Boolean, $questionId: Int!){
  updateQuestion(isActive: $isActive, questionId: $questionId){
    question {
      question
      isActive
    }
  }
}`;

const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestion($questionId: Int!, $question: String!, $questionTitle: String!, $questionType: String!, $startDate: DateTime!, $endDate: DateTime!){
    updateQuestion(questionId:$questionId, question:$question, questionType:$questionType, questionTitle:$questionTitle, startDate:$startDate, endDate:$endDate){
      question{
        question
        questionTitle
        questionType
        startDate
        endDate
      }
    }
  }
`;

const ADD_ROOM_FEEDBACK_QUESTIONS = gql`
  mutation createQuestion($question: String!, $questionTitle: String!, $questionType: String!, $startDate: DateTime!, $endDate: DateTime!){
    createQuestion(question: $question, questionTitle: $questionTitle, questionType: $questionType, startDate: $startDate, endDate: $endDate){
      question{
        question
        questionTitle
        questionType
        startDate
        endDate
      }
    }
  }
`;

const DELETE_ROOM_FEEDBACK_QUESTION = gql`
  mutation deleteQuestion($questionId: Int!){
    deleteQuestion(questionId: $questionId){
      question{
        id
        question
      }
    }
  }
`;

export {
  UPDATE_QUESTION_STATUS_MUTATION as default,
  UPDATE_QUESTION_MUTATION,
  DELETE_ROOM_FEEDBACK_QUESTION,
  ADD_ROOM_FEEDBACK_QUESTIONS,
};
