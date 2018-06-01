import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../../src/containers/Settings';

describe('Settings component', () => {
  const match = {
    isExact: false,
    params: {},
    path: '/settings',
    url: '/settings',
  };

  const wrapper = shallow(<Settings match={match} />);

  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
