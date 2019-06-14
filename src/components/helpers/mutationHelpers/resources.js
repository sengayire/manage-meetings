/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import apolloClient from '../../../utils/ApolloClient';
import { DELETE_RESOURCE_MUTATION, EDIT_RESOURCE_MUTATION } from '../../../graphql/mutations/resources';
import { GET_RESOURCES_QUERY } from '../../../graphql/queries/Resources';
import { ADD_RESOURCE_MUTATION } from '../../../graphql/mutations/AddResourceToRoom';

const updateStore = (data, deleteResource) =>
  data.allResources.resources.filter((resource) => {
    if (resource.id !== deleteResource.resource.id) {
      return resource;
    }
  });

const deleteResources = async (currentPage, perPage, { resourceId }, client = apolloClient) => {
  await client
    .mutate({
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
        resourceData.allResources.resources = updateStore(resourceData, deleteResource);
        // Write our data back to the cache.
        proxy.writeQuery({
          query: GET_RESOURCES_QUERY,
          variables: {
            page: currentPage,
            perPage,
          },
          data: resourceData,
        });
      },
    });
};

const addResourceMutation = async (name, client = apolloClient) => {
  await client
    .mutate({
      mutation: ADD_RESOURCE_MUTATION,
      name: addResourceMutation,
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
      name: editResourceMutation,
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
export { deleteResources, updateStore, addResourceMutation, editResourceMutation };
