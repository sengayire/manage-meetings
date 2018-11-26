import React from 'react';
import { shallow } from 'enzyme';
import DonutChart from '../../../../src/components/analytics/checkins/DonutChart';

describe('Checkins component', () => {
  const props = { tip: '' };
  const wrapper = shallow(<DonutChart {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
