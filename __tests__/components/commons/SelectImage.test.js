import React from 'react';
import { mount } from 'enzyme';
import SelectImage from '../../../src/components/commons/SelectImage';

describe('Select Image', () => {
  it('should render properly', () => {
    const wrapper = mount(<SelectImage imageUrl="" onChange={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render properly', () => {
    const wrapper = mount(<SelectImage imageUrl="path/to/image.jpg" onChange={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
