import React from 'react';
import { mount } from 'enzyme';
import { QueryLeastBookedRooms } from '../../../src/components/analytics/QueryLeastBookedRooms';


describe('Query Least Booked Rooms Component', () => {
  const props = {
    dateValue: {
      startDate: 'Nov 01 2018',
      endDate: 'Nov 01 2018',
    },
  };

  it('should load progressBar', () => {
    const wrapper = mount(
      <QueryLeastBookedRooms {...props} updateParent={jest.fn()} />,
    );
    expect(wrapper.find('ThemedProgressBar')).toHaveLength(1);
  });
});
