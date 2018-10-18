import React from 'react';
import { shallow } from 'enzyme';
import DonutChart from '../../../../src/components/analytics/checkins/DonutChart';

describe('Checkins component', () => {
  const wrapper = shallow(<DonutChart />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

