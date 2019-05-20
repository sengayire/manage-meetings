import React from 'react';
import { shallow } from 'enzyme';
import { Checkins } from '../../../../src/components/analytics/checkins';
import { getCheckinsBookingsCancellationsPercentages } from '../../../../src/components/helpers/QueriesHelpers';


jest.mock('../../../../src/components/helpers/QueriesHelpers');

describe('Checkins component', () => {
  getCheckinsBookingsCancellationsPercentages.mockResolvedValue({});
  const props = {
    dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018', isFutureDateSelected: false },
    queryCompleted: jest.fn(),
    updateParent: jest.fn(),
  };
  const wrapper = shallow(<Checkins {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains three doughnut charts', () => {
    expect(wrapper.find('.checkins').children()).toHaveLength(3);
  });

  it('should call queryCompleted and updateParent when the component updates', () => {
    const component = shallow(<Checkins {...props} />);
    component.setState(
      {
        loading: false,
        error: null,
        analyticsRatios: { name: 'Kimame' },
      },
      () => {
        expect(props.queryCompleted).toHaveBeenCalled();
        expect(props.updateParent).toHaveBeenCalled();
      },
    );
  });
});
