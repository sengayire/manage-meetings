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

export default SINGLE_ROOM_FEEDBACK;
