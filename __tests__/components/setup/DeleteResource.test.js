import React from 'react';
import { mount } from 'enzyme';
import Resources from '../../../src/components/setup/resources/Resources';
import * as QueryHelpers from '../../../src/components/helpers/QueriesHelpers';
import { remoteRooms, allResources, user } from '../../../src/fixtures/resourcesData';

let mockStore = {
  data: {
    allResources: {
      resources: allResources,
    },
    allRemoteRooms: {
      rooms: remoteRooms,
    },
  },
};

jest.mock('../../../src/utils/ApolloClient', () => ({
  mutate: config =>
    new Promise((resolve) => {
      config.update(
        {
          readQuery: () => mockStore.data,
          writeQuery: (mockNewStore) => {
            mockStore = mockNewStore;
          },
        },
        { data: { deleteResource: { resource: { id: '93' } } } },
      );
      resolve();
    }),
}));

describe('delete resource component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Resources />);
    jest
      .spyOn(QueryHelpers, 'getAllResources')
      .mockImplementationOnce(() => mockStore.data.allResources);
    jest
      .spyOn(QueryHelpers, 'getAllRemoteRooms')
      .mockImplementationOnce(() => mockStore.data.allRemoteRooms);
    jest.spyOn(QueryHelpers, 'getUserDetails').mockImplementationOnce(() => user.user);
  });

  it('should delete a resource when the delete button is clicked', async () => {
    expect(wrapper.state('resourcesData').resources).toBe(undefined);
    await wrapper.instance().getAllResources();
    expect(wrapper.state('resourcesData').resources.length).toBe(3);
    wrapper.update();
    wrapper
      .find('DeleteResource IconButtons button')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.delete-modal-content').exists()).toEqual(true);
    const deleteButton = wrapper.find('.delete-modal-content button').at(1);
    deleteButton.simulate('click');
    expect(mockStore.data.allResources.resources.length).toBe(2);
  });
  it('should close a modal when cancel button is clicked', async () => {
    expect(wrapper.state('resourcesData').resources).toBe(undefined);
    await wrapper.instance().getAllResources();
    expect(wrapper.state('resourcesData').resources.length).toBe(2);
    wrapper.update();
    wrapper
      .find('DeleteResource IconButtons button')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.delete-modal-content').exists()).toEqual(true);
    const cancelButton = wrapper.find('.delete-modal-content button').at(0);
    cancelButton.simulate('click');
    expect(wrapper.find('.delete-modal-content').exists()).toEqual(false);
  });
});
