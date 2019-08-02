import gql from 'graphql-tag';

const SINGLE_ROOM_FEEDBACK = gql`
  query getSingleRoomFeedback($roomId: Int!) {
    roomResponse(roomId: $roomId) {
      roomName,
      totalResponses,
      response {
        id,
        createdDate,
        questionType,
        resolved,
        response {
          __typename
          ... on Rate {
            rate
          }
          ... on SelectedOptions {
            options
          }
          ... on TextArea {
            suggestion
          }
          ... on MissingItems {
            missingItems {
              id
              name
              state
            }
          }
        }
      }
    }
  }
`;

const ALL_ROOM_FEEDBACK = gql`
  query allRoomResponses($startDate: String!, $endDate: String!) {
    allRoomResponses(startDate: $startDate, endDate: $endDate){
      pages
      hasPrevious
      hasNext
      queryTotal
      responses {
        roomId
        roomName
        totalResponses
        response {
          id
          createdDate
          resolved
          response {
            __typename
            ... on Rate {
              rate
            }
            ... on SelectedOptions {
              options
            }
            ... on TextArea {
              suggestion
            }
            ... on MissingItems {
              missingItems {
                id
                name
                state
              }
            }
          }
        }
      }
    }
  }
`;

export { SINGLE_ROOM_FEEDBACK as default, ALL_ROOM_FEEDBACK };
