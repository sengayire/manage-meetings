import React from 'react';
import { mount } from 'enzyme';
import AddQuestion from '../../../src/components/roomFeedback/AddQuestion';
import MrmModal from '../../../src/components/commons/Modal';

describe('AddQuestion component', () => {
  const wrapper = mount(<AddQuestion />);

  it('should render a modal component with length of 1', () => {
    expect(wrapper.find(MrmModal).length).toEqual(1);
  });

  it('should display the input fields in the modal', () => {
    wrapper.find('#modal-button').simulate('click');
    expect(wrapper.find('input')).toHaveLength(3);
  });

  it('should set the value of questionType to the option selected', () => {
    const event = {
      target: { name: 'questionType', value: 2 },
    };

    expect(wrapper.state().questionType).toEqual('');
    wrapper.find('.default-select').simulate('change', event);
    expect(wrapper.state().questionType).toEqual(2);
  });

  it('should call sendDateData', () => {
    const spy = jest.spyOn(wrapper.instance(), 'sendDateData');
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should close the question modal when closeModal is called', () => {
    expect(wrapper.state().closeModal).toBe(false);
    expect(wrapper.find('.question-form').length).toEqual(1);

    wrapper.find('button').at(2).simulate('click');

    expect(wrapper.state().closeModal).toBe(true);
    expect(wrapper.find('.question-form').length).toEqual(0);
  });
});
