import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsOverview from '../../src/containers/AnalyticsOverview';

describe('Analytics component', () => {
  const wrapper = shallow(<AnalyticsOverview />);

  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
