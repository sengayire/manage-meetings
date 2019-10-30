import React from 'react';
import { shallow } from 'enzyme';
import InputField from '../../../src/components/commons/InputField';

describe('InputField Component', () => {
  const wrapper = shallow(<InputField />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  const textInputValue = {
    currentTarget: {
      name: 'center_name',
      value: 'Epic Tower',
    },
  };
  it('Should update input on textChange', () => {
    wrapper.props().children[0].props.onChange(textInputValue);
    const currentStateValue = wrapper.instance().state.inputValue;
    expect(currentStateValue).toBe('Epic Tower');
  });

  it('Should render default placeholder prop', () => {
    expect(wrapper.props().children[0].props.placeholder).toBe('eg Epic Campus');
  });

  it('Should render passed placeholder prop', () => {
    const component = shallow(<InputField placeholder="Andela Campus" />);
    expect(component.props().children[0].props.placeholder).toBe('Andela Campus');
  });

  it('Should test if input value is at least 2 characters', () => {
    textInputValue.currentTarget.value = 'E';
    wrapper.props().children[0].props.onChange(textInputValue);
    const errorMessage = wrapper.instance().state.errors.center_name;
    expect(errorMessage).toBe('"the center name" length must be at least 2 characters long');
    expect(wrapper.find('.error-area-style').exists()).toBeTruthy();
  });
});
