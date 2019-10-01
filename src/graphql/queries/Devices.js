import gql from 'graphql-tag';

export const GET_DEVICES_QUERY = gql`
  query devices {
    allDevices {
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
`;

export const GET_SPECIFIC_DEVICE_QUERY = gql`
  query singleDevice($deviceId: Int!) {
    specificDevice(deviceId: $deviceId) {
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
`;
