import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import BookingsCountBarGraph from '../../../../src/components/analytics/barGraph/BookingsCountBarGraph';
import { queryBookingsCountMockData } from '../../../../__mocks__/analytics/queryBookingsCountMockData';

const props = {
  dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
};

const analyticsMocks = queryBookingsCountMockData;

describe('Bookings Count Bar Graph Component', () => {
  const wrapper = mount(
    <MockedProvider mocks={analyticsMocks}>
      <BookingsCountBarGraph {...props} />
    </MockedProvider>,
  );
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should be able to hover', () => {
    const helpIcon = wrapper.find('img[alt="help icon"]');
    const nativeEvent = { nativeEvent: { clientX: 300, clientY: 250 } };
    helpIcon.simulate('mouseenter', nativeEvent);
    expect(wrapper).toMatchSnapshot();
    helpIcon.simulate('mouseleave', nativeEvent);
    expect(wrapper).toMatchSnapshot();
  });
});
