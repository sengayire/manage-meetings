import React from 'react';
import { mount } from 'enzyme';
import Calendar from '../../../src/components/commons/Calendar';

describe('it renders correctly', () => {
  const props = {
    sendData: jest.fn(),
  };
  const wrapper = mount(<Calendar {...props} />);
  const wrapperInstance = wrapper.instance();

  it('it should render a button with length 1', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should display calendar when button is clicked', () => {
    expect(wrapper.find('.calendar').exists()).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.calendar').exists()).toBe(true);
  });

  it('changes the value of start and end date in state when handleChange is called', () => {
    const dates = {
      to: ' Wed Nov 5 2018',
      from: ' Wed Nov 6 2018',
    };
    wrapperInstance.handleChange(dates);
    expect(wrapper.state('startDate')).toEqual(dates.from.slice(4, 15));
  });

  it('should set the value of end date to start date when handleChange is called with no end date', () => {
    const dates = {
      from: ' Wed Nov 6 2018',
      to: '',
    };
    wrapperInstance.handleChange(dates);
    expect(wrapper.state('endDate')).toEqual(dates.from.slice(4, 15));
  });

  it('should call sendDate with the right arguments', () => {
    const startDate = 'Nov 19 2018';
    const endDate = 'Nov 26 2018';

    const spy = jest.spyOn(wrapperInstance, 'sendDate');
    spy(startDate, endDate);

    expect(wrapperInstance.sendDate).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });
});
