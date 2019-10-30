import React from 'react';
import { shallow } from 'enzyme';
import InputWithNumbers from '../../../src/components/commons/numberInput';

describe('Number Input Component', () => {
  const wrapper = shallow(<InputWithNumbers />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
