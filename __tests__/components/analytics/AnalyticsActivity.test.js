import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsActivity from '../../../src/containers/AnalyticsActivity';

describe('AnalyticsActivity component', () => {
  const wrapper = shallow(<AnalyticsActivity />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
