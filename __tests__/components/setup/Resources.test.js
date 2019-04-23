import React from 'react';
import { shallow, mount } from 'enzyme';
import Resources from '../../../src/components/setup/resources/Resources';
import * as QueryHelpers from '../../../src/components/helpers/QueriesHelpers';
import { remoteRooms, allResources, user } from '../../../src/fixtures/resourcesData';

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
    jest.spyOn(QueryHelpers, 'getUserDetails').mockImplementationOnce(() => user.user);
  });

  it('should update state with a list of resources and remote rooms', async () => {
    expect(wrapper.state('remoteRooms').length).toBe(0);
    expect(wrapper.state('resourcesData').resources).toBe(undefined);
    await wrapper.instance().getAllResources();
    expect(wrapper.state('remoteRooms').length).toBe(1);
    expect(wrapper.state('resourcesData').resources.length).toBe(3);
  });

  it('should open a modal when a resource is clicked', async () => {
    await wrapper.instance().getAllResources();
    wrapper.update();
    expect(
      wrapper.instance().AllocatedResourcesComponent.current.toggleModalComponent.current.state
        .isOpen,
    ).toBe(false);
    const resource = wrapper.find('.resource-list-item span').first();
    resource.simulate('click');
    expect(
      wrapper.instance().AllocatedResourcesComponent.current.toggleModalComponent.current.state
        .isOpen,
    ).toBe(true);
  });

  it('should updates the state with room details', async () => {
    await wrapper.instance().getAllResources();
    wrapper.update();
    const resource = wrapper.find('.resource-list-item span').first();
    resource.simulate('click');
    wrapper.update();
    wrapper
      .find('.modal--input select')
      .simulate('change', { target: { name: 'roomDetails', value: 'resource' } });
    expect(wrapper.instance().AllocatedResourcesComponent.current.state.roomDetails).toBe(
      'resource',
    );
  });

  it('should display an error icon incase there are no rooms available', async () => {
    await wrapper.instance().getAllResources();
    wrapper.instance().setState({ remoteRooms: [] });
    wrapper.update();
    const resources = wrapper.find('.resource-list-item span').first();
    resources.simulate('click');
    expect(wrapper.find('ErrorIcon').length).toBe(1);
  });

  describe('Unit test for the Resources component', () => {
    let component;
    const resources = [
      {
        id: '23',
        name: 'resource-name',
      },
    ];
    beforeEach(() => {
      jest.spyOn(Resources.prototype, 'componentDidMount').mockImplementationOnce(() => true);
      component = shallow(<Resources />);
      jest.spyOn(QueryHelpers, 'getUserDetails').mockImplementationOnce(() => user.user);
    });
    afterEach(() => {
      component.unmount();
    });

    it('should render a spinner while data is being fetched from the backend', () => {
      component.setState({ isFetching: true });
      expect(component.find('Spinner').length).toBe(1);
    });

    it('should render pagination component when data is returned from the backend', async () => {
      await component.instance().getAllResources();
      component.setState({ isFetching: false, resourcesData: { resources } });
      expect(component.find('Pagination')).toHaveLength(1);
    });

    it('should render add resource button', async () => {
      await component.instance().getAllResources();
      component.setState({ isFetching: false });
      expect(component.find('AddResource')).toHaveLength(1);
    });

    it('should render resource items', async () => {
      await component.instance().getAllResources();
      component.setState({ isFetching: false, resourcesData: { resources } });
      expect(component.find('.resource-list-item')).toHaveLength(1);
    });
  });
});
