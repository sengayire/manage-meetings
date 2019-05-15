import React from 'react';
import { shallow } from 'enzyme';
import AverageMeetingListComponent from '../../../src/components/analytics/AverageMeetingList';
import { getAnalyticForMeetingDurations } from '../../../src/components/helpers/QueriesHelpers';


jest.mock('../../../src/components/helpers/QueriesHelpers');


describe('Average Meeting List Component', () => {
  let wrapper;
  beforeAll(() => {
    const props = {
      dateValue: {
        startDate: 'Nov 02 2018',
        endDate: 'Nov 03 2018',
        isFutureDateSelected: false,
      },
      queryCompleted: jest.fn(),
    };

    getAnalyticForMeetingDurations.mockResolvedValue({});
    wrapper = shallow(<AverageMeetingListComponent {...props} updateParent={jest.fn()} />);
  });

  it('renders correctly from memory', () => {
    getAnalyticForMeetingDurations.mockResolvedValue({});
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render <AverageMeetingList />', async () => {
    expect(wrapper.text()).toContain('Average time spent/Meeting');
  });

  it('Should show an error when a future date is selected ', () => {
    const initialProps = {
      dateValue: { isFutureDateSelected: true },
      queryCompleted: jest.fn(),
      updateParent: jest.fn(),
    };
    const component = shallow(<AverageMeetingListComponent {...initialProps} />);
    expect(component.find('.average-table-error').text()).toBe(
      'You cannot fetch data beyond today',
    );
  });

  it('should call queryCompleted and updateParent when the component updates', () => {
    const initialProps = {
      dateValue: { isFutureDateSelected: true },
      queryCompleted: jest.fn(),
      updateParent: jest.fn(),
    };
    const component = shallow(<AverageMeetingListComponent {...initialProps} />);
    component.setState({
      analyticsForMeetingsDurations: { duration: 'data' },
      loading: false,
    });
    expect(initialProps.queryCompleted).toHaveBeenCalled();
    expect(initialProps.updateParent).toHaveBeenCalled();
  });
});
