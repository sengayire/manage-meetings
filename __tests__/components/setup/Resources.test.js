import React from 'react';
import { mount } from 'enzyme';
import Resources from '../../../src/components/setup/resources/Resources';
import * as QueryHelpers from '../../../src/components/helpers/QueriesHelpers';
import { remoteRooms, allResources } from '../../../src/fixtures/resourcesData';

describe('Resources list component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Resources />);
    jest
      .spyOn(QueryHelpers, 'getAllResources')
      .mockImplementationOnce(() => ({ resources: allResources }));
    jest
      .spyOn(QueryHelpers, 'getAllRemoteRooms')
      .mockImplementationOnce(() => ({ rooms: remoteRooms }));
  });

  it('should update state with a list of resources and remote rooms', async () => {
    expect(wrapper.state('remoteRooms').length).toBe(0);
    expect(wrapper.state('resources').length).toBe(0);
    await wrapper.instance().getAllResources();
    expect(wrapper.state('remoteRooms').length).toBe(1);
    expect(wrapper.state('resources').length).toBe(3);
  });

  it('should open a modal when a resource is clicked', async () => {
    await wrapper.instance().getAllResources();
    wrapper.update();
    expect(
      wrapper.instance().AllocatedResourcesComponent.current.toggleModalComponent.current.state
        .isOpen,
    ).toBe(false);
    const resource = wrapper.find('.resource-list-item').first();
    resource.simulate('click');
    expect(
      wrapper.instance().AllocatedResourcesComponent.current.toggleModalComponent.current.state
        .isOpen,
    ).toBe(true);
  });

  it('should updates the state with room details', async () => {
    await wrapper.instance().getAllResources();
    wrapper.update();
    const resource = wrapper.find('.resource-list-item').first();
    resource.simulate('click');
    wrapper.update();
    wrapper
      .find('.modal--input select')
      .simulate('change', { target: { name: 'roomDetails', value: 'resource' } });
    expect(wrapper.instance().AllocatedResourcesComponent.current.state.roomDetails).toBe(
      'resource',
    );
  });

  describe('Resources component model', () => {
    let wrapped;
    beforeEach(() => {
      wrapped = mount(<Resources />);
      jest
        .spyOn(QueryHelpers, 'getAllResources')
        .mockImplementationOnce(() => ({ resources: allResources }));
      jest.spyOn(QueryHelpers, 'getAllRemoteRooms').mockImplementationOnce(() => ({ rooms: [] }));
    });

    it('should display an error icon incase there are no rooms available', async () => {
      await wrapped.instance().getAllResources();
      wrapped.update();
      const resource = wrapped.find('.resource-list-item').first();
      resource.simulate('click');
      expect(wrapped.find('ErrorIcon').length).toBe(1);
    });
  });
});
