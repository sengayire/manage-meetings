import React from 'react';
import { shallow } from 'enzyme';
import { Checkins } from '../../../../src/components/analytics/checkins';

describe('Checkins component', () => {
  const props = {
    dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018', isFutureDateSelected: false },
    data: {
      loading: false,
      error: null,
    },
    queryCompleted: jest.fn(),
  };
  const wrapper = shallow(<Checkins {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains three doughnut charts', () => {
    expect(wrapper.find('.checkins').children()).toHaveLength(3);
  });

  it('should call queryCompleted when the component updates', () => {
    jest.spyOn(Checkins.prototype, 'componentDidUpdate');
    const component = shallow(<Checkins {...props} />);
    component.instance().componentDidUpdate();
    expect(props.queryCompleted.mock.calls.length).toBe(1);
    expect(Checkins.prototype.componentDidUpdate.mock.calls.length).toBe(1);
  });
});

