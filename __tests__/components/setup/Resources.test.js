import React from 'react';
import { shallow, mount } from 'enzyme';
import Resources from '../../../src/components/setup/resources/Resources';
import * as QueryHelpers from '../../../src/components/helpers/QueriesHelpers';
import { remoteRooms, allResources, user } from '../../../src/fixtures/resourcesData';

jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('Resources list component', () => {
  let wrapper;
  beforeAll(() => {
    QueryHelpers.getAllRooms.mockResolvedValue({ allRooms: { rooms: [] } });
    wrapper = mount(<Resources />);
    QueryHelpers.getAllResources
      .mockResolvedValue({ resources: allResources });
    QueryHelpers.getAllRemoteRooms
      .mockResolvedValue({ rooms: remoteRooms });
    QueryHelpers.getUserDetails
      .mockResolvedValue(user.user);
  });

  it.skip('should update state with a list of resources and remote rooms', async () => {
    expect(wrapper.state('remoteRooms').length).toBe(0);
    expect(wrapper.state('resourcesData').resources).toBe(undefined);
    await wrapper.instance().getAllResources();
    expect(wrapper.state('remoteRooms').length).toBe(1);
    expect(wrapper.state('resourcesData').resources.length).toBe(3);
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
