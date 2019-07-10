import React from 'react';
import { shallow } from 'enzyme';
import FilterRoomResponses from '../../../src/components/roomFeedback/FilterRoomResponses';


describe('FilterRoomResponses test', () => {
  let wrapper;
  const props = {
    roomFilter: '',
    setRoom: jest.fn(),
    setResponseCutoff: jest.fn(),
    sliderSpan: { minValue: 0, maxValue: 3 },
    filterData: jest.fn(),
    rooms: ['Tortuga'],
    useFilter: false,
    clearFilters: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<FilterRoomResponses {...props} />);
  });
  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should select room', () => {
    wrapper.find('SelectInput').dive().find('select').simulate('change', { target: { value: 'Tortuga' } });
    expect(wrapper.state('roomFilter')).toBe('Tortuga');
  });

  test('Should set slider value', () => {
    wrapper.instance().handleSliderChange({ min: 1, max: 4 });
    expect(wrapper.state('sliderValue')).toEqual({ min: 1, max: 4 });
  });

  test('Should call filter handler', () => {
    wrapper.find('.btn-primary').simulate('click');
    expect(props.setRoom).toHaveBeenLastCalledWith('Tortuga');
  });

  test('Should reset fields', () => {
    wrapper.setProps({ useFilter: true });
    wrapper.setProps({ useFilter: false });
    expect(wrapper.state('roomFilter')).toBe('');
    expect(wrapper.state('sliderValue')).toEqual({ min: 0, max: 3 });
  });
});
