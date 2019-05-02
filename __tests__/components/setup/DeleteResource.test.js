import React from 'react';
import { mount } from 'enzyme';
import DeleteResource from '../../../src/components/setup/resources/DeleteResource';
import { remoteRooms, allResources } from '../../../src/fixtures/resourcesData';

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
  const props = {
    resource: allResources[0],
    currentPage: 1,
    perPage: 5,
    handleOnDeleteResource: jest.fn(),
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<DeleteResource {...props} />);
  });

  it('should delete a resource when the delete button is clicked', async () => {
    wrapper.instance().toggleModalComponent.current.setState({ role: '2' });
    wrapper.update();
    wrapper
      .find('DeleteResource IconButtons button')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.delete-modal-content').exists()).toEqual(true);
    const deleteButton = wrapper.find('.form-action-buttons button').at(1);
    deleteButton.simulate('click');
    expect(mockStore.data.allResources.resources.length).toBe(2);
  });
  it('should close a modal when cancel button is clicked', async () => {
    wrapper.instance().toggleModalComponent.current.setState({ role: '2' });
    wrapper.update();
    wrapper
      .find('DeleteResource IconButtons button')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.delete-modal-content').exists()).toEqual(true);
    const cancelButton = wrapper.find('.form-action-buttons button').at(0);
    cancelButton.simulate('click');
    expect(wrapper.find('.delete-modal-content').exists()).toEqual(false);
  });
});
