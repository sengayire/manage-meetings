/* eslint-disable import/prefer-default-export */
import apolloClient from '../../../utils/ApolloClient';
import { ADD_DEVICE_MUTATION, EDIT_DEVICE_MUTATION } from '../../../graphql/mutations/Devices';
import { GET_DEVICES_QUERY } from '../../../graphql/queries/Devices';
import { GET_ROOMS_QUERY } from '../../../graphql/queries/Rooms';

export const addDeviceMutation = async ({
  name, roomId, deviceType, location,
}, client = apolloClient) => {
  await client
    .mutate({
      mutation: ADD_DEVICE_MUTATION,
      name: 'addDeviceMutation',
      variables: {
        name, deviceType, roomId,
      },
      // write and read from cache
      update: async (proxy, { data: { createDevice: { device } } }) => {
        const cachedDevices = proxy.readQuery({
          query: GET_DEVICES_QUERY,
        });
        const deviceList = cachedDevices.allDevices;
        cachedDevices.allDevices = [...deviceList, device];

        proxy.writeQuery({
          query: GET_DEVICES_QUERY,
          data: cachedDevices,
        });
        const cachedRooms = proxy.readQuery({
          query: GET_ROOMS_QUERY,
          variables: {
            location,
            office: '',
            page: 1,
            perPage: 8,
            roomLabels: '',
          },
        });

        const target = cachedRooms.allRooms.rooms.findIndex(({ id }) => id === roomId);

        const roomsDeviceList = cachedRooms.allRooms.rooms[target].devices;

        cachedRooms.allRooms.rooms[target].devices = [...roomsDeviceList, device];

        proxy.writeQuery({
          query: GET_ROOMS_QUERY,
          variables: {
            location,
            office: '',
            page: 1,
            perPage: 8,
            roomLabels: '',
          },
          data: cachedRooms,
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
