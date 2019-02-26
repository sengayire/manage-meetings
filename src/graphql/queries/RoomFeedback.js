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
  query {
    allRoomResponses{
      responses {
        roomId
        roomName
        totalResponses
        totalRoomResources
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
