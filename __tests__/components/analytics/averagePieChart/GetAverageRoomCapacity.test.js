import React from 'react';
import { shallow } from 'enzyme';
import { queryAllRoomsCapacity } from '../../../../__mocks__/analytics/queryBookingsCountMockData';
import { GetAverageRoomCapacityComponent } from '../../../../src/components/analytics/averagePieChart/GetAverageRoomCapacity';

const props = {
  data: {
    loading: false,
    error: undefined,
    allRooms: {
      rooms: [
        {
          id: '1041',
          name: 'Wasu',
          capacity: 4,
        },
      ],
    },
  },
};

describe('Get Average Room Capacity Component', () => {
  const wrapper = shallow(<GetAverageRoomCapacityComponent {...props} />);
  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });

  it('Calls the getRoomData function which returns the percentage of average room capacity', () => {
    const getRoomData = wrapper.instance().getRoomData();
    expect(getRoomData).toEqual(queryAllRoomsCapacity);
  });

  it('Expect that function getRoomData gets called when component re-renders', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getRoomData');
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalled();
  });
});

