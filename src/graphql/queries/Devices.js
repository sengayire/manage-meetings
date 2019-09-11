import gql from 'graphql-tag';
import { deviceFieldsFR } from './Fragments';

export const GET_DEVICES_QUERY = gql`
  query devices {
    allDevices {
      ...deviceFields
    }
  }
  ${deviceFieldsFR}
`;

export const GET_SPECIFIC_DEVICE_QUERY = gql`
  query singleDevice($deviceId: Int!) {
    specificDevice(deviceId: $deviceId) {
      ...deviceFields
    }
  }
  ${deviceFieldsFR}
`;
