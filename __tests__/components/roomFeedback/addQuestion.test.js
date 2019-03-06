import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { AddQuestion } from '../../../src/components/roomFeedback/AddQuestion';
import MrmModal from '../../../src/components/commons/Modal';

describe('AddQuestion component', () => {
  const initProps = {
    addQuestion: jest.fn(),
  };
  let wrapper = mount(<AddQuestion {...initProps} />);

  it('should render a modal component with length of 1', () => {
    expect(wrapper.find(MrmModal).length).toEqual(1);
  });

  it('should display the input fields in the modal', () => {
    wrapper.find('#modal-button').simulate('click');
    expect(wrapper.find('input')).toHaveLength(4);
  });

  it('should set the value of questionType to the option selected', () => {
    const event = {
      target: { name: 'questionType', value: 2 },
    };

    expect(wrapper.state().questionType).toEqual(0);
    wrapper.find('.default-select').simulate('change', event);
    expect(wrapper.state().questionType).toEqual(2);
  });

  it('should call sendDateData', () => {
    const spy = jest.spyOn(wrapper.instance(), 'sendDateData');
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should change closeModal to true when handleCloseModal is called', () => {
    const shallowWrapper = shallow(<AddQuestion {...initProps} />);
    expect(shallowWrapper.state('closeModal')).toEqual(false);
    shallowWrapper.instance().handleCloseModal();
    expect(shallowWrapper.state('closeModal')).toEqual(true);
  });

  it('should change closeModal to false when handleModalStateChange is called', () => {
    const shallowWrapper = shallow(<AddQuestion {...initProps} />);
    shallowWrapper.setState({ closeModal: true });
    shallowWrapper.instance().handleModalStateChange();
    expect(shallowWrapper.state('closeModal')).toEqual(false);
  });

  it('should change the value of question in the state', () => {
    const input = wrapper.find('input').at(1);
    expect(wrapper.instance().state.question).toEqual('');
    input.simulate('change', { target: { name: 'question', value: 'Question' } });
    expect(wrapper.instance().state.question).toEqual('Question');
  });

  it('should format the date and time correctly', () => {
    const instance = wrapper.instance().formatDateTime('2019-03-28', '15:42');
    expect(instance).toEqual('2019-03-28T15:42:00');
  });

  it('should contain an error when questionTitle is not provided', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: '',
      questionType: 1,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.state().error.questionTitle).toEqual('Please provide the title of the question');
  });

  it('should contain an error when question is not provided', () => {
    wrapper.setState({
      question: '',
      questionTitle: 'Something',
      questionType: 1,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.state().error.question).toEqual('Please provide the feedback question');
  });

  it('should contain an error when question type is not selected', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: 'Something',
      questionType: 0,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.state().error.type).toEqual('Please select the question type');
  });

  it('should contain an error when start date is the same as the end date', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: 'Something',
      questionType: 0,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.instance().compareDates(new Date('2019-03-29'), new Date('2019-03-29'));
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.state().error.date).toEqual('End date should be at least a day after start date');
  });

  it('should contain an error when start date is before today', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: 'Something',
      questionType: 0,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.instance().compareDates(new Date('2019-01-29'), new Date('2019-03-29'));
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.state().error.date).toEqual('Start date cannot be past days');
  });

  it('should contain an error when end date is before today', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: 'Something',
      questionType: 0,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.instance().compareDates(new Date('2019-03-29'), new Date('2019-01-29'));
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.state().error.date).toEqual('End date should be at least a day after today');
  });

  it('should throw an error when start date is incorrect', () => {
    wrapper.unmount();
    wrapper = mount(<AddQuestion {...initProps} />);
    wrapper.find('#modal-button').simulate('click');
    wrapper.setState({
      question: 'Something',
      questionTitle: 'Something',
      questionType: 1,
      startDate: '2019-03-30T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.find('.btn-primary').at(1).simulate('click');
    expect(wrapper.instance().state.error.date).toEqual('End date should be at least a day after start date');
  });

  it('should call createQuestion when all validations pass', () => {
    const props = {
      addQuestion: jest.fn(() => Promise.resolve()),
    };
    wrapper = shallow(<AddQuestion {...props} refetch={jest.fn} />);
    wrapper.setState({
      question: 'Blabla',
      questionTitle: 'Something',
      questionType: 1,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    wrapper.instance().compareDates('2019-03-28', '2019-03-29');
    const spy = jest.spyOn(wrapper.instance(), 'createQuestion');
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call createQuestion when submit is clicked', () => {
    const props = {
      addQuestion: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] }))),
    };
    wrapper = shallow(<AddQuestion {...props} refetch={jest.fn} />);
    wrapper.setState({
      question: 'Blabla',
      questionTitle: 'Something',
      questionType: 1,
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
    });
    const spy = jest.spyOn(wrapper.instance(), 'createQuestion');
    spy();
    expect(spy).toHaveBeenCalled();
  });
});
