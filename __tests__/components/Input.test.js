import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../src/components/commons/Input';

describe('Input Component', () => {
  const props = {
    name: '',
    value: '',
    inputClass: '',
    id: '',
    labelName: '',
    labelClass: '',
  };
  const wrapper = shallow(<Input {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have one input', () => {
    const modalForm = wrapper.find('input');
    expect(modalForm).toHaveLength(1);
  });

  it('should have one label', () => {
    const modalForm = wrapper.find('label');
    expect(modalForm).toHaveLength(1);
  });
});
