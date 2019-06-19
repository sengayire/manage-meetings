import gql from 'graphql-tag';

const UPDATE_QUESTION_STATUS_MUTATION = gql`
mutation updateQuestion($isActive: Boolean, $questionId: Int!){
  updateQuestion(isActive: $isActive, questionId: $questionId){
    question {
      id
      question
      questionType
      questionTitle
      startDate
      endDate
      questionResponseCount
      isActive
      checkOptions
    }
  }
}`;

const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestion($questionId: Int!, $question: String!, $questionTitle: String!, $questionType: String!, $startDate: DateTime!, $endDate: DateTime!){
    updateQuestion(questionId:$questionId, question:$question, questionType:$questionType, questionTitle:$questionTitle, startDate:$startDate, endDate:$endDate){
      question{
        id
        question
        questionType
        questionTitle
        startDate
        endDate
        questionResponseCount
        isActive
        checkOptions
      }
    }
  }
`;

const ADD_ROOM_FEEDBACK_QUESTIONS = gql`
  mutation createQuestion($checkOptions: [String]!, $question: String!, $questionTitle: String!, $questionType: String!, $startDate: DateTime!, $endDate: DateTime!){
    createQuestion(checkOptions: $checkOptions, question: $question, questionTitle: $questionTitle, questionType: $questionType, startDate: $startDate, endDate: $endDate){
      question{
        id
        question
        questionType
        questionTitle
        startDate
        endDate
        questionResponseCount
        isActive
        checkOptions
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
        questionType
        questionTitle
        startDate
        endDate
        questionResponseCount
        isActive
        checkOptions
      }
    }
  }
`;

export {
  UPDATE_QUESTION_STATUS_MUTATION,
  UPDATE_QUESTION_MUTATION,
  DELETE_ROOM_FEEDBACK_QUESTION,
  ADD_ROOM_FEEDBACK_QUESTIONS,
};
