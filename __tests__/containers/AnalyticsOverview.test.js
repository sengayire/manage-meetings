import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsOverview from '../../src/containers/AnalyticsOverview';

describe('AnalyticsOverview Component', () => {
  const wrapper = shallow(<AnalyticsOverview />);
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
