import React from 'react';
import { mount, shallow } from 'enzyme';
import PickDate from '../../../src/components/helpers/RangePicker';

describe('test for date picker', () => {
  const handleDayClick = jest.fn();
  const mockStateDates = {
    startDate: 'Nov 19 2018',
    endDate: 'Nov 26 2018',
  };
  const calendarProps = {
    sendDateData: jest.fn(() => Promise.resolve(
      mockStateDates.startDate,
      mockStateDates.endDate,
    )),
    handleChange: jest.fn(),
    getNumberOfDays: jest.fn(),
  };
  const wrapper = mount(<PickDate onClick={handleDayClick} {...calendarProps} />);
  it('it should have a calendar', () => {
    const calendar = wrapper.find('DayPicker');
    expect(calendar).toHaveLength(1);
  });
  it('handles chosen days', () => {
    wrapper.setState({ from: new Date('05 Nov 2018') });
    const chosenParagraph = wrapper.find('#chosen-days');
    expect(chosenParagraph.props().children).toContain('Please select a day');
    wrapper.setState({ from: '' });
  });
  it('handles chosen days if one date selected', () => {
    wrapper.setState({ to: new Date('05 Nov 2018') });
    const chosenParagraph = wrapper.find('#chosen-days');
    expect(chosenParagraph.props().children).toContain('Please select a day');
  });
  it('handles getting number of days selected', () => {
    wrapper.setState({ from: new Date('05 Nov 2018'), to: new Date('20 Nov 2018') });
    expect(wrapper.instance().getNumberOfDays()).toBe('15 days');
    wrapper.setState({ from: new Date('05 Nov 2018'), to: new Date('06 Nov 2018') });
    expect(wrapper.instance().getNumberOfDays()).toBe('1 day');
  });
  it('handles day click', () => {
    const mockStateDates2 = {
      startDate: 'Nov 19 2018',
      endDate: 'Nov 26 2018',
    };
    const calendarProps2 = {
      handleChange: jest.fn(() => Promise.resolve(
        mockStateDates2.startDate,
        mockStateDates2.endDate,
      )),
    };
    const Calendarwrapper = shallow(<PickDate {...calendarProps2} />);

    Calendarwrapper.setState({
      startDate: '05 Nov 2018',
      endDate: '05 Nov 2018',
    });

    const variables = {
      to: '05 Nov 2018',
      from: '05 Nov 2018',
    };

    Calendarwrapper.instance().handleDayClick(new Date(variables.from));
    Calendarwrapper.instance().handleDayClick(new Date(variables.to));
    expect(calendarProps2.handleChange).toBeCalled();
  });
});

