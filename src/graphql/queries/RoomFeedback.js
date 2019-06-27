import gql from 'graphql-tag';

const SINGLE_ROOM_FEEDBACK = gql`
  query getSingleRoomFeedback($roomId: Int!) {
    roomResponse(roomId: $roomId) {
      roomName,
      totalResponses,
      response {
        responseId,
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
  query allRoomResponses($page: Int, $perPage: Int, $startDate: String!, $endDate: String!, $upperLimitCount: Int, $lowerLimitCount: Int) {
    allRoomResponses(page: $page, perPage: $perPage, startDate: $startDate, endDate: $endDate, lowerLimitCount: $lowerLimitCount, upperLimitCount: $upperLimitCount){
      pages
      hasPrevious
      hasNext
      queryTotal
      responses {
        roomId
        roomName
        totalResponses
        response {
          responseId
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
