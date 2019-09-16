import gql from 'graphql-tag';
import { paginationFR, idNameFR } from './Fragments';

const responseDetailFR = gql`
fragment responseDetail on ResponseDetail {
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
        ...idNameResource
      }
    }
  }
}
${idNameFR('Resource')}`;

export const responseFR = gql`
fragment response on RoomResponse {
  roomId
  roomName
  totalResponses
}
`;

const SINGLE_ROOM_FEEDBACK = gql`
  query getSingleRoomFeedback($roomId: Int!) {
    roomResponse(roomId: $roomId) {
      ...response
      response {
        questionType
        ...responseDetail
      }
    }
  }
${responseFR}
${responseDetailFR}
`;

const ALL_ROOM_FEEDBACK = gql`
  query allRoomResponses($startDate: String!, $endDate: String!) {
    allRoomResponses(startDate: $startDate, endDate: $endDate){
      ...pagination
      responses {
        ...response
        response {
          ...responseDetail
        }
      }
    }
  }
${responseFR}
${responseDetailFR}
${paginationFR('PaginatedResponses')}
`;

export { SINGLE_ROOM_FEEDBACK as default, ALL_ROOM_FEEDBACK };
