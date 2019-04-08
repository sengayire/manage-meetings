import React from 'react';
import { mount } from 'enzyme';
import { QueryMostBookedRooms } from '../../../src/components/analytics/QueryMostBookedRooms';


describe('Query Most Booked Rooms Component', () => {
  const props = {
    dateValue: {
      startDate: 'Nov 01 2018',
      endDate: 'Nov 01 2018',
    },
  };

  it('should load progressBar', () => {
    const wrapper = mount(
      <QueryMostBookedRooms {...props} updateParent={jest.fn()} />,
    );
    expect(wrapper.find('ThemedProgressBar')).toHaveLength(1);
  });
});
