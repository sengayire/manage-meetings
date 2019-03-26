import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import AverageMeetingComponent, { AverageMeetingList }
  from '../../../src/components/analytics/AverageMeetingList';
import MEETING_DURATION_ANALYTICS from '../../../src/graphql/queries/analytics';

describe('Average Meeting List Component', () => {
  const props = {
    dateValue: {
      startDate: 'Nov 02 2018',
      endDate: 'Nov 03 2018',
      isFutureDateSelected: false,
    },
    queryCompleted: jest.fn(),
  };

  const mocks = [
    {
      request: {
        query: MEETING_DURATION_ANALYTICS,
        variables: {
          startDate: 'Nov 02 2018',
          endDate: 'Nov 03 2018',
          page: 1,
          perPage: 5,
        },
      },
      averageMeetingDurations: [
        {
          roomName: 'Entebbe',
          count: 62,
          totalDuration: 2440,
        },
      ],
    },
  ];

  const setup = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AverageMeetingComponent {...props} updateParent={jest.fn()} />
    </MockedProvider>
  );

  const wrapper = mount(setup);

  it('renders correctly from memory', () => {
    expect(shallow(<AverageMeetingComponent
      {...props}
      updateParent={jest.fn()}
    />)).toMatchSnapshot();
  });

  it('Should render <AverageMeetingList />', async () => {
    await wait(0); // Wait a tick to get past the loading state
    expect(wrapper.text()).toContain('Average time spent/Meeting');
  });

  it('Should toggle state when handleData is called ', () => {
    const initialProps = {
      data: {
        fetchMore: jest.fn(() => Promise.resolve()),
        variables: {
          startDate: 'Nov 02 2018',
          endDate: 'Nov 03 2018',
          page: 1,
          perPage: 5,
        },
      },
      dateValue: { isFutureDateSelected: false },
      queryCompleted: jest.fn(),
    };
    const component = shallow(<AverageMeetingList {...initialProps} updateParent={jest.fn()} />);
    component.instance().handleData();
    expect(component.state('isFetching')).toBe(true);
  });
  it('Should show an error when a future date is selected ', () => {
    const initialProps = {
      data: {
        fetchMore: jest.fn(() => Promise.resolve()),
        variables: {
          startDate: 'Nov 02 2018',
          endDate: 'Nov 03 2018',
          page: 1,
          perPage: 5,
        },
      },
      dateValue: { isFutureDateSelected: true },
      queryCompleted: jest.fn(),
    };
    const component = shallow(<AverageMeetingList {...initialProps} updateParent={jest.fn()} />);
    expect(component.find('.average-table-error').text()).toBe('You cannot fetch data beyond today');
  });
  it('should call queryCompleted when the component updates', () => {
    const initialProps = {
      data: {
        error: false,
        loading: false,
        fetchMore: jest.fn(() => Promise.resolve()),
        variables: {
          startDate: 'Nov 02 2018',
          endDate: 'Nov 03 2018',
          page: 1,
          perPage: 5,
        },
      },
      dateValue: { isFutureDateSelected: true },
      queryCompleted: jest.fn(),
    };
    jest.spyOn(AverageMeetingList.prototype, 'componentDidUpdate');
    const component = shallow(<AverageMeetingList {...initialProps} updateParent={jest.fn()} />);
    component.instance().componentDidUpdate();
    expect(initialProps.queryCompleted.mock.calls.length).toBe(1);
    expect(AverageMeetingList.prototype.componentDidUpdate.mock.calls.length).toBe(1);
  });
});
