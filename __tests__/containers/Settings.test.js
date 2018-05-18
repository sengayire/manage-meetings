import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../../src/containers/Settings';

describe('Settings component', () => {
  const wrapper = shallow(<Settings />);
  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
