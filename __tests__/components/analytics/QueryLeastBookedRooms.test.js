import React from 'react';
import { mount } from 'enzyme';
import { QueryLeastBookedRooms } from '../../../src/components/analytics/QueryLeastBookedRooms';
import { getLeastBookedRooms } from '../../../src/components/helpers/QueriesHelpers';

jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('Query Least Booked Rooms Component', () => {
  const props = {
    dateValue: {
      startDate: 'Nov 01 2018',
      endDate: 'Nov 01 2018',
    },
  };

  it('should load progressBar', () => {
    getLeastBookedRooms.mockResolvedValue({});
    const wrapper = mount(
      <QueryLeastBookedRooms {...props} updateParent={jest.fn()} />,
    );
    expect(wrapper.find('Overlay')).toHaveLength(1);
  });
});
