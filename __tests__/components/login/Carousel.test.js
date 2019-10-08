import React from 'react';
import { mount } from 'enzyme';
import Carousel from '../../../src/components/login/Carousel';


describe('Carousel component', () => {
  const wrapper = mount(<Carousel legendPosition="left" />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
