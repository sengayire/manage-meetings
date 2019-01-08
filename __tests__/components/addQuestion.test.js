import React from 'react';
import { shallow } from 'enzyme';
import AddQuestion from '../../src/components/AddQuestion';

describe('AddQuestion component', () => {
  const wrapper = shallow(<AddQuestion />);
  const questionWrapper = wrapper.instance();

  it('should be rendered without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(8);
  });

  it('should display the input fields in the modal', () => {
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it('should toggle modal visibility by changing state when cancel is clicked', () => {
    expect(wrapper.state().closeModal).toBe(false);
    wrapper.find('.button-container').childAt(1).simulate('click');
    expect(wrapper.state().closeModal).toBe(true);
  });

  it('should toggle the calendar on button click', () => {
    expect(wrapper.state().calenderOpen).toBe(false);
    wrapper.find('#calendar-btn').at(0).simulate('click');
    expect(wrapper.state().calenderOpen).toBe(true);
  });

  it('should call sendDateData function', () => {
    questionWrapper.sendDateData('05 Jan 2018', '06 Jan 2018');
    expect(questionWrapper.state.startDate).toEqual('05 Jan 2018');
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('handleInputChange should update state when onChange happens on select input', () => {
    const Input = wrapper.find('#selectType');
    Input.simulate('change', { target: { name: 'questionType', value: '1' } });
    expect(wrapper.instance().state.questionType).toEqual('1');
  });
});
