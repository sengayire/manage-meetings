/* eslint-disable import/prefer-default-export */
import apolloClient from '../../../utils/ApolloClient';
import { ADD_DEVICE_MUTATION, EDIT_DEVICE_MUTATION, DELETE_DEVICE_MUTATION } from '../../../graphql/mutations/Devices';
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
            page: 1, perPage: 8, location, office: '', roomLabels: '',
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
  // edit device mutation
  await client.mutate({
    name: 'editDeviceMutation',
    mutation: EDIT_DEVICE_MUTATION,
    variables,
    // write and read from cache
    update: async (proxy, { data: { updateDevice: { device } } }) => {
      const cachedDevices = proxy.readQuery({ query: GET_DEVICES_QUERY });
      const deviceList = cachedDevices.allDevices;
      deviceList.forEach(({ id }, i) => { // update item in cache
        if (id === device.id) { cachedDevices[i] = device; }
      });

      proxy.writeQuery({
        query: GET_DEVICES_QUERY,
        data: cachedDevices,
      });
    },
  });
};

const newDeviceslist = (devicesList, device) => {
  const list = [];
  devicesList.forEach(({ id }, i) => {
    if (id !== device.id) { list.push(devicesList[i]); }
  });
  return list;
};

const updatedCachedRooms = (rooms, target, device) => {
  const targetRoom = target;
  const otherRooms = rooms.filter((room) => {
    const result = room.id !== device.roomId;
    return result;
  });
  targetRoom.devices = newDeviceslist(targetRoom.devices, device);
  otherRooms.push(targetRoom);
  return otherRooms;
};

const cachedRoomslist = (location, proxy) => proxy.readQuery({
  // cachedRooms read from cache
  query: GET_ROOMS_QUERY,
  variables: {
    page: 1,
    perPage: 8,
    location,
    office: '',
    roomLabels: '',
  },
});

const targetRoom = (rooms, device) => rooms.filter((room) => {
  const result = parseInt(room.id, 10) === device.roomId;
  return result;
})[0];

export const deleteDeviceMutation = async (variables, client = apolloClient) => {
  await client
    .mutate({
      mutation: DELETE_DEVICE_MUTATION,
      name: 'deleteDeviceMutation',
      variables, // write and read from cache
      update: async (proxy, { data: { deleteDevice: { device } } }) => {
        try { // write and read from cache
          const cachedDevices = proxy.readQuery({ query: GET_DEVICES_QUERY });
          cachedDevices.allDevices = newDeviceslist(cachedDevices.allDevices, device);
          proxy.writeQuery({ query: GET_DEVICES_QUERY, data: cachedDevices });

          const { location } = variables;
          const cachedRooms = cachedRoomslist(location, proxy);
          const target = targetRoom(cachedRooms.allRooms.rooms, device);

          cachedRooms.allRooms.rooms =
            updatedCachedRooms(cachedRooms.allRooms.rooms, target, device);

          proxy.writeQuery({
            query: GET_ROOMS_QUERY,
            variables: {
              location, office: '', page: 1, perPage: 8, roomLabels: '',
            },
            data: cachedRooms,
          });
        } catch (error) { return null; }
        return null;
      },
    });
};
