import gql from 'graphql-tag';

const SINGLE_ROOM_FEEDBACK = gql`
  query getSingleRoomFeedback($roomId: Int!) {
    roomResponse(roomId: $roomId) {
      roomName,
      totalResponses,
      totalRoomResources,
      response {
        responseId,
        suggestion,
        missingItems,
        createdDate,
        rating,
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
          suggestion
          responseId
          missingItems
          createdDate
          rating
        }
      }
    }
  }
`;

export { SINGLE_ROOM_FEEDBACK as default, ALL_ROOM_FEEDBACK };
