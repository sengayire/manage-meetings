/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import apolloClient from '../../../utils/ApolloClient';
import { DELETE_RESOURCE_MUTATION, EDIT_RESOURCE_MUTATION, ASSIGN_RESOURCE_MUTATION } from '../../../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../../../graphql/queries/Resources';
import { ADD_RESOURCE_MUTATION } from '../../../graphql/mutations/AddResourceToRoom';
import { GET_ROOMS_QUERY } from '../../../graphql/queries/Rooms';

const updateStore = (data, deleteResource) =>
  data.allResources.resources.filter((resource) => {
    if (resource.id !== deleteResource.resource.id) {
      return resource;
    }
  });

const updateRooms = (rooms, resourceId) => {
  const updatedRooms = rooms.map((room) => {
    room.resources = room.resources.filter(resource => resource.resource.id !== resourceId);
    return room;
  });
  return updatedRooms;
};


const deleteResources = async (
  currentPage,
  perPage,
  { resourceId },
  location,
  client = apolloClient,
) => {
  await client.mutate({
    mutation: DELETE_RESOURCE_MUTATION,
    name: 'deleteResource',
    variables: {
      resourceId,
    },
    refetchQueries: [
      {
        query: GET_RESOURCES_QUERY,
        variables: {
          page: currentPage,
          perPage,
        },
      },
    ],
    update: async (proxy, { data: { deleteResource } }) => {
      // Read the data from our cache for this query.
      const resourceData = proxy.readQuery({
        query: GET_RESOURCES_QUERY,
        variables: {
          page: currentPage,
          perPage,
        },
      });
      // Remove a resource from the store.
      resourceData.allResources.resources = updateStore(
        resourceData,
        deleteResource,
      );
      // Write our data back to the cache.
      proxy.writeQuery({
        query: GET_RESOURCES_QUERY,
        variables: {
          page: currentPage,
          perPage,
        },
        data: resourceData,
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

      const updatedRooms = updateRooms(cachedRooms.allRooms.rooms, resourceId);
      const updatedCachedRooms = { ...cachedRooms };
      updatedCachedRooms.allRooms.rooms = updatedRooms;

      proxy.writeQuery({
        query: GET_ROOMS_QUERY,
        variables: {
          location,
          office: '',
          page: 1,
          perPage: 8,
          roomLabels: '',
        },
        data: updatedCachedRooms,
      });
    },
  });
};

const addResourceMutation = async (name, client = apolloClient) => {
  await client
    .mutate({
      mutation: ADD_RESOURCE_MUTATION,
      name: 'addResourceMutation',
      variables: { name },
      // write and read from cache
      update: async (proxy, { data: { createResource } }) => {
        const cachedResources = proxy.readQuery({
          query: GET_RESOURCES_QUERY,
          variables: {
            page: 1,
            perPage: 5,
          },
        });
        const resourceList = cachedResources.allResources.resources;
        cachedResources.allResources.resources = [...resourceList, createResource.resource];

        proxy.writeQuery({
          query: GET_RESOURCES_QUERY,
          variables: {
            page: 1,
            perPage: 5,
          },
          data: cachedResources,
        });
      },
    });
};

const editResourceMutation = async (resourceId, name, client = apolloClient) => {
  await client
    .mutate({
      mutation: EDIT_RESOURCE_MUTATION,
      name: 'editResourceMutation',
      variables: { resourceId, name },

      update: async (proxy, { data: { updateRoomResource } }) => {
        proxy.readQuery({
          query: GET_RESOURCES_QUERY,
          variables: {
            page: 1,
            perPage: 5,
          },
        });

        proxy.writeQuery({
          query: GET_RESOURCES_QUERY,
          variables: {
            page: 1,
            perPage: 5,
          },
          data: updateRoomResource,
        });
      },
    });
};

export const assignResourceMutation = async ({
  resourceId, room, quantity, location,
}, client = apolloClient,
) => {
  const { roomId } = room;
  await client
    .mutate({
      mutation: ASSIGN_RESOURCE_MUTATION,
      name: 'assignResourceMutation',
      variables: { resourceId, roomId, quantity },

      update: async (proxy, { data: { assignResource: { roomResource } } }) => {
        try {
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
          const resourceList = cachedRooms.allRooms.rooms[target].resources;
          cachedRooms.allRooms.rooms[target].resources = [...resourceList, roomResource];

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
        } catch (error) {
          return null;
        }
      },
    });
};

export { deleteResources, updateStore, addResourceMutation, editResourceMutation };
