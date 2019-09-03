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
        rooms: [
          {
            id: '1230',
            name: 'Another here',
            capacity: 9,
            roomLabels: [
              '4th',
              'Kampala',
            ],
            roomType: 'Meeting room',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/andelamrm.appspot.com/o/upload%2F60410220_840773989622302_6083125467391459328_n.jpg?alt=media&token=a9c3cade-8c6a-4ee5-81ea-436e530364f2',
            structureId: '8261c030-7ae9-4091-afb9-a2f4a457843f',
            locationId: 2,
          },
        ],
      },
    });
    wrapper = shallow(<DeviceList
      location={{
        name: 'Lagos',
        id: 2,
      }}
      userLocationChanged={false}
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
      id: 2,
    }}
    />);
    await wrapper.instance().getData();
    expect(wrapper.exists('ErrorIcon')).toBeTruthy();
  });

  it('renders pagination component', async () => {
    getAllDevices.mockResolvedValue(devices.concat(moreDevices));
    wrapper = shallow(<DeviceList
      location={{
        name: 'Lagos',
        id: 2,
      }}
    />);
    await wrapper.instance().getData();
    expect(wrapper.exists('Pagination')).toBeTruthy();
  });

  it('calls handle action', async () => {
    wrapper.instance().handleAction('edit', {});
    expect(wrapper.state('openModal')).toBe('edit');
  });

  it('calls closeModal', async () => {
    wrapper.instance().closeModal();
    expect(wrapper.state('openModal')).toBe(false);
  });

  it('calls componentDidUpdate', async () => {
    wrapper.instance().componentDidUpdate({ userLocationChanged: true }, { a: 1, b: 5 });
    expect(getAllDevices).toHaveBeenCalled();
  });
});
