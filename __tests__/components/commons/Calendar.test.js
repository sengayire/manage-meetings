import React from 'react';
import { mount, shallow } from 'enzyme';
import moment from 'moment';
import Calendar from '../../../src/components/commons/Calendar';

describe('it renders correctly', () => {
  const sendDate = jest.fn();
  const props = {
    handleCloseModal: jest.fn(),
    sendDateData: jest.fn(),
    setWrapperRef: jest.fn((node) => {
      props.wrapperRef = node;
    }),
    handleClickOutside: jest.fn((event) => {
      if (props.wrapperRef && !props.wrapperRef.contains(event.target)) {
        props.handleCloseModal();
      }
    }),
  };
  const wrapper = mount(
    <Calendar handleCloseModal={jest.fn()} onClick={sendDate} {...props} />,
  );

  it('it should have a calendar', () => {
    const calendar = wrapper.find('PickRange');
    expect(calendar).toHaveLength(1);
  });

  it('should have a div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(124);
  });

  it('should have a button', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
  });

  it('handles cancel', () => {
    const canceldateBtn = wrapper.find('#cancel_date_button');
    canceldateBtn.simulate('click');
    expect(props.handleCloseModal).toBeCalled();
  });

  it('should have initial state', () => {
    expect(wrapper.state().startDate).toEqual(moment().format('MMM DD Y'));
    expect(wrapper.state().endDate).toEqual(moment().format('MMM DD Y'));
  });

  it('handles handleChange()', () => {
    const dates = {
      to: ' Wed Nov 5 2018',
      from: ' Wed Nov 6 2018',
    };
    wrapper.instance().handleChange(dates);
    expect(wrapper.state('startDate')).toEqual(dates.from.slice(4, 15));
  });
  it('handles handleChange() with one date', () => {
    const dates = {
      to: ' Wed Nov 5 2018',
      from: ' ',
    };
    wrapper.instance().handleChange(dates);
    expect(wrapper.state('startDate')).not.toEqual(dates.from.slice(4, 15));
  });

  it('handles setDate', () => {
    const mockStateDates = {
      startDate: 'Nov 19 2018',
      endDate: 'Nov 26 2018',
    };
    const calendarProps = {
      sendDateData: jest.fn(() =>
        Promise.resolve(mockStateDates.startDate, mockStateDates.endDate),
      ),
    };
    const Calendarwrapper = shallow(
      <Calendar handleCloseModal={jest.fn()} {...calendarProps} />,
    );

    Calendarwrapper.setState({
      startDate: '05 Nov 2018',
      endDate: '05 Nov 2018',
    });

    const variables = {
      endDate: '05 Nov 2018',
      startDate: '05 Nov 2018',
    };

    Calendarwrapper.instance().sendDate();
    expect(calendarProps.sendDateData).toHaveBeenCalledWith(
      variables.startDate,
      variables.endDate,
    );
  });
  it('handles handleChange', () => {
    const mockStateDates = {
      startDate: 'Nov 19 2018',
      endDate: 'Nov 26 2018',
    };
    const calendarProps = {
      sendDateData: jest.fn(() =>
        Promise.resolve(mockStateDates.startDate, mockStateDates.endDate),
      ),
    };
    const Calendarwrapper = shallow(
      <Calendar handleCloseModal={jest.fn()} {...calendarProps} />,
    );

    Calendarwrapper.setState({
      startDate: '05 Nov 2018',
      endDate: '05 Nov 2018',
    });

    const variables = {
      endDate: '05 Nov 2018',
      startDate: '05 Nov 2018',
    };

    Calendarwrapper.instance().sendDate();
    expect(calendarProps.sendDateData).toHaveBeenCalledWith(
      variables.startDate,
      variables.endDate,
    );
  });
});
