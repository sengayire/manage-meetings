import React from 'react';
import { shallow } from 'enzyme';
import Feedback from '../../src/containers/Feedback';

describe('Feedback component', () => {
  const wrapper = shallow(<Feedback />);

  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
