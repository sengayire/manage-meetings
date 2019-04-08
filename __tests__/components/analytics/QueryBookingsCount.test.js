import React from 'react';
import { mount } from 'enzyme';
import QueryBookingsCount from '../../../src/components/analytics/QueryBookingsCount';
import ErrorBoundary from '../../../src/components/commons/ErrorBoundary';

const props = {
  dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
};

describe('Query Bookings Count Component', () => {
  it('should render without error', async () => {
    const tree = mount(
      <ErrorBoundary >
        <QueryBookingsCount {...props} updateParent={jest.fn()} />
      </ErrorBoundary>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render analytics data', async () => {
    const tree = mount(
      <ErrorBoundary >
        <QueryBookingsCount {...props} updateParent={jest.fn()} />
      </ErrorBoundary>,
    );

    expect(tree).toMatchSnapshot();
  });
});
