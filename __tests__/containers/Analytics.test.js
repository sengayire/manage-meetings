import React from 'react';
import { shallow } from 'enzyme';
import Analytics from '../../src/containers/Analytics';

describe('Analytics component', () => {
  const wrapper = shallow(<Analytics client={{}} />);

  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
