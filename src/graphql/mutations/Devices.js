import gql from 'graphql-tag';
import { idNameFR } from '../queries/Fragments';

const deviceFR = gql`
fragment device on Devices {
  ...idNameDevices
  deviceType
  dateAdded
  lastSeen
  location
  room {
    ...idNameRoom
  }
}
${idNameFR('Room')}
${idNameFR('Devices')}`;

export const ADD_DEVICE_MUTATION = gql`
mutation CreateDevice($name: String! $roomId: Int! $deviceType: String!) {
    createDevice(name: $name roomId: $roomId deviceType: $deviceType) {
    device {
      ...device
    }
  }
}
${deviceFR}`;

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
        ...device
      }
    }
  }
${deviceFR}`;

export const DELETE_DEVICE_MUTATION = gql`
  mutation deleteDevice($deviceId: Int!) {
    deleteDevice(deviceId: $deviceId) {
      device {
        ...idNameDevices
        roomId
      }
    }
  }
${idNameFR('Devices')}`;
