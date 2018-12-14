import React from 'react';
import { shallow } from 'enzyme';
import EditFeedback from '../../src/components/EditFeedback';

describe('EditFeedback Component', () => {
  const props = {
    question: 'How would you rate the cleanliness of this room',
    type: 'rate',
    startDate: '3 Nov 2018',
    duration: '3 Weeks',
  };

  const wrapper = shallow(<EditFeedback {...props} />);

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: '',
      value: '',
    },
  };

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should count the number of Select and Input element', () => {
    expect(wrapper.find('Input').length).toBe(3);
    expect(wrapper.find('SelectInput').length).toBe(1);
  });

  it('should respond to a state change', () => {
    wrapper.find('#question').simulate('change', {
      target: { name: 'question', value: 'Is there any missing meeting tools' },
    });
    expect(wrapper.find('#question').props().value).toBe('Is there any missing meeting tools');
    expect(wrapper.state('question')).toEqual('Is there any missing meeting tools');
  });

  it('should handleEditFeedback()', () => {
    wrapper.instance().handleEditFeedback(event);
    expect(wrapper.state('closeModal')).toEqual(true);
  });
});

