import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryBookingsCount from '../../../src/components/analytics/QueryBookingsCount';
import ErrorBoundary from '../../../src/components/commons/ErrorBoundary';
import { queryBookingsCountMockData, queryBookingsCountMocksData } from '../../../__mocks__/analytics/queryBookingsCountMockData';

const props = {
  dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
};

const analyticsGraphMock = queryBookingsCountMockData;

describe('Query Bookings Count Component', () => {
  it('should render without error', async () => {
    const tree = mount(
      <MockedProvider mocks={analyticsGraphMock}>
        <ErrorBoundary >
          <QueryBookingsCount {...props} updateParent={jest.fn()} />
        </ErrorBoundary>
      </MockedProvider>,
    );
    await wait(0);
    expect(tree).toMatchSnapshot();
  });
  it('should render analytics data', async () => {
    const analyticsGraphMockData = queryBookingsCountMocksData;

    const tree = mount(
      <MockedProvider mocks={[analyticsGraphMockData]} addTypename={false}>
        <ErrorBoundary >
          <QueryBookingsCount {...props} updateParent={jest.fn()} />
        </ErrorBoundary>
      </MockedProvider>,
    );

    await wait(0);
    expect(tree).toMatchSnapshot();
  });
});
