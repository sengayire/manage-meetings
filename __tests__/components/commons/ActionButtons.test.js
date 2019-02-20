import React from 'react';
import { shallow } from 'enzyme';
import ActionButtons from '../../../src/components/commons/ActionButtons';
import Button from '../../../src/components/commons/Button';
import Spinner from '../../../src/components/commons/Spinner';

describe('ActionButton component', () => {
  const wrapper = shallow(<ActionButtons onClickCancel={jest.fn()} onClickSubmit={jest.fn()} />);

  it('should render the right number of buttons', () => {
    expect(wrapper.find(Button).length).toBe(2);
  });

  it('should display spinner when isloading is true', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find(Button).length).toBe(0);
    expect(wrapper.find(Spinner).length).toBe(1);
  });
});
