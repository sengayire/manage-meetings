import React from 'react';
import { shallow } from 'enzyme';
import DeviceList from '../../../src/components/devices/DeviceList';
import { getAllDevices, getAllRooms } from '../../../src/components/helpers/QueriesHelpers';
import devices from '../../../src/fixtures/devices';

const moreDevices = [{
  name: 'Samsung tablet',
  deviceType: 'Internal Display',
  dateAdded: '14 Aug 2018',
  lastSeen: '16 Feb 2018',
  location: 'Nairobi',
}, {
  name: 'Samsung Galaxy',
  deviceType: 'Internal Display',
  dateAdded: '14 Aug 2018',
  lastSeen: '16 Feb 2018',
  location: 'Nairobi',

}];


jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('DeviceList Component', () => {
  let wrapper;
  beforeAll(() => {
    getAllDevices.mockResolvedValue(devices);
    getAllRooms.mockResolvedValue({
      allRooms: {
        rooms: [],
      },
    });
    wrapper = shallow(<DeviceList location={{
      name: 'Lagos',
    }}
    />);
  });
  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('updatePageDetails behaves as expected', () => {
    wrapper.instance().updatePageDetails();
    expect(wrapper.state('hasNext')).toBe(false);
  });

  it('handles page change correctly', () => {
    const mock = jest.spyOn(wrapper.instance(), 'updatePageDetails');
    wrapper.instance().handlePageChange(4, 1);
    wrapper.instance().handlePageChange(undefined, 1);
    expect(wrapper.state('currentPage')).toBe(1);
    expect(mock).toHaveBeenCalled();
  });

  it('getData method works as expected', async () => {
    await wrapper.instance().getData();
    expect(getAllDevices).toHaveBeenCalled();
    expect(getAllRooms).toHaveBeenCalled();
  });

  it('renders error icon', async () => {
    getAllDevices.mockResolvedValue([]);
    wrapper = shallow(<DeviceList location={{
      name: 'Lagos',
    }}
    />);
    await wrapper.instance().getData();
    expect(wrapper.exists('ErrorIcon')).toBeTruthy();
  });

  it('renders pagination component', async () => {
    getAllDevices.mockResolvedValue(devices.concat(moreDevices));
    wrapper = shallow(<DeviceList location={{
      name: 'Lagos',
    }}
    />);
    await wrapper.instance().getData();
    expect(wrapper.exists('Pagination')).toBeTruthy();
  });
});
