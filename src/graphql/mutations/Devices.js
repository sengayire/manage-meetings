import gql from 'graphql-tag';

export const ADD_DEVICE_MUTATION = gql`
mutation CreateDevice($name: String! $roomId: Int! $deviceType: String!) {
    createDevice(name: $name roomId: $roomId deviceType: $deviceType) {
    device {
      id
      name
      deviceType
      dateAdded
      lastSeen
      location
      room {
        id
        name
      }
    }
  }
}
`;

export const EDIT_DEVICE_MUTATION = gql`
  mutation updateDevice($deviceId: Int! $name: String $roomId: Int! $deviceType: String $location: String) {
    updateDevice (
      deviceId: $deviceId,
      name: $name,
      roomId: $roomId,
      deviceType: $deviceType,
      location: $location
    ) {
      device {
        id
        name
        deviceType
        dateAdded
        lastSeen
        location
        room {
          id
          name
        }
      }
    }
  }
`;
