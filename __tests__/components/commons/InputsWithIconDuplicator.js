import React from 'react';
import { shallow } from 'enzyme';
import InputsWithAddIcons from '../../../src/components/commons/InputAddIcon/index';

describe('Input With Plus Icon component', () => {
  const inputValues = {
    currentTarget: {
      name: 'building_name_1',
      value: 'e',
    },
  };
  const wrapper = shallow(<InputsWithAddIcons />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should add another input with plus icon on the page', () => {
    wrapper.instance().onAddInput();
    expect(wrapper.state('inputs')).toBe(2);
  });

  it('Should retrun an error when input is less than 2 characters', () => {
    wrapper.instance().handleTextChange(inputValues);
    expect(wrapper.state('errors')).toEqual(
      { building_name_1: '"the building name" length must be at least 2 characters long' });
  });

  it('Should not return an error when input is 2 characters and above', () => {
    inputValues.currentTarget.value = 'eastAf';
    wrapper.instance().handleTextChange(inputValues);
    expect(wrapper.state('errors')).toEqual({ building_name_1: '' });
  });
});
