import gql from 'graphql-tag';

const GET_ROOM_FEEDBACK_QUESTIONS_QUERY = gql`
  query {
    questions{
      questions {
        id
        question
        questionType
        startDate
        endDate
        questionResponseCount
        isActive
      }
    }
  }
`;

export default GET_ROOM_FEEDBACK_QUESTIONS_QUERY;
