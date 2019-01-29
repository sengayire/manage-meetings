import React from 'react';
import { shallow, mount } from 'enzyme';
import { Input } from '../../../src/components/commons/Input';

describe('Input Component', () => {
  const props = {
    name: '',
    value: '',
    inputClass: '',
    id: '',
    labelName: '',
    labelClass: '',
    onChange: jest.fn(),
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

describe('Input mount', () => {
  const props = {
    name: 'numberField',
    value: 1,
    inputClass: '',
    id: '',
    type: 'number',
    labelName: '',
    labelClass: '',
    onChange: jest.fn(),
  };
  const wrapper = mount(<Input {...props} />);
  it('should decerease on button down click', () => {
    wrapper.find('input').instance().value = 2;
    wrapper.find('button.down').simulate('click', { target: { name: 'down' } });
    expect(wrapper.find('input').instance().value).toEqual('1');
  });

  it('should not decerease on button down click', () => {
    wrapper.find('input').instance().value = 0;
    wrapper.find('button.down').simulate('click', { target: { name: 'down' } });
    expect(wrapper.find('input').instance().value).toEqual('0');
  });

  it('should increase on button up click', () => {
    wrapper.instance().clear();
    const spy = jest.spyOn(wrapper.instance(), 'handleIncrement');
    wrapper.instance().forceUpdate();
    wrapper.find('button.up').simulate('click', { target: { name: 'up' } });
    expect(spy).toHaveBeenCalled();
  });
});
