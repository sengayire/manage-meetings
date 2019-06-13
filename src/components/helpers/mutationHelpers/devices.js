/* eslint-disable import/prefer-default-export */
import apolloClient from '../../../utils/ApolloClient';
import { ADD_DEVICE_MUTATION, EDIT_DEVICE_MUTATION } from '../../../graphql/mutations/Devices';
import { GET_DEVICES_QUERY } from '../../../graphql/queries/Devices';

export const addDeviceMutation = async ({
  name, roomId, deviceType,
}, client = apolloClient) => {
  await client
    .mutate({
      mutation: ADD_DEVICE_MUTATION,
      name: 'addDeviceMutation',
      variables: {
        name, deviceType, roomId,
      },
      // write and read from cache
      update: async (proxy, { data: { createDevice } }) => {
        const cachedDevices = proxy.readQuery({
          query: GET_DEVICES_QUERY,
        });
        const deviceList = cachedDevices.allDevices;
        cachedDevices.allDevices = [...deviceList, createDevice.device];

        proxy.writeQuery({
          query: GET_DEVICES_QUERY,
          data: cachedDevices,
        });
      },
    });
};

export const editDeviceMutation = async (variables, client = apolloClient) => {
  await client
    .mutate({
      mutation: EDIT_DEVICE_MUTATION,
      name: 'editDeviceMutation',
      variables,
      // write and read from cache
      update: async (proxy, { data: { updateDevice: { device } } }) => {
        const cachedDevices = proxy.readQuery({
          query: GET_DEVICES_QUERY,
        });
        const deviceList = cachedDevices.allDevices;
        deviceList.forEach(({ id }, i) => { // update item in cache
          if (id === device.id) {
            cachedDevices[i] = device;
          }
        });

        proxy.writeQuery({
          query: GET_DEVICES_QUERY,
          data: cachedDevices,
        });
      },
    });
};


export const deleteDeviceMutation = () => Promise.resolve('Device deleted');
