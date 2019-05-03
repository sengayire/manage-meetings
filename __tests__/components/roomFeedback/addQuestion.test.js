import React from 'react';
import { shallow } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { AddQuestion } from '../../../src/components/roomFeedback/AddQuestion';
// eslint-disable-next-line import/no-named-as-default
import MrmModal from '../../../src/components/commons/MrmModal';

describe('AddQuestion component', () => {
  const initProps = {
    addQuestion: jest.fn(),
    client: { query: jest.fn() },
  };
  let wrapper = shallow(<AddQuestion {...initProps} />);

  it('should render a modal component with length of 1', () => {
    expect(wrapper.find(MrmModal).length).toEqual(1);
  });

  it('should call sendDateData', () => {
    const spy = jest.spyOn(wrapper.instance(), 'sendDateData');
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should change closeModal to false when handleModalStateChange is called', () => {
    const shallowWrapper = shallow(<AddQuestion {...initProps} />);
    shallowWrapper.setState({ closeModal: true });
    shallowWrapper.instance().handleModalStateChange();
    expect(shallowWrapper.state('closeModal')).toEqual(false);
  });

  it('should change the value of question in the state', () => {
    expect(wrapper.instance().state.question).toEqual('');
    const event = { target: { name: 'question', value: 'Question' } };
    wrapper.instance().handleInputChange(event);
    expect(wrapper.instance().state.question).toEqual('Question');
  });

  it('should format the date and time correctly', () => {
    const instance = wrapper.instance().formatDateTime('2020-03-28', '15:42');
    expect(instance).toEqual('2020-03-28T15:42:00');
  });

  it('should contain an error when questionTitle is not provided', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: '',
      questionType: 1,
      startDate: '2020-03-28T15:42:43',
      endDate: '2020-03-29T15:42:43',
    });
    wrapper.instance().validateInputFields();
    expect(wrapper.state().error.questionTitle).toEqual('Please provide the title of the question');
  });

  it('should contain an error when question is not provided', () => {
    wrapper.setState({
      question: '',
      questionTitle: 'Something',
      questionType: 1,
      startDate: '2020-03-28T15:42:43',
      endDate: '2020-03-29T15:42:43',
    });
    wrapper.instance().validateInputFields();
    expect(wrapper.state().error.question).toEqual('Please provide the feedback question');
  });

  it('should contain an error when question type is not selected', () => {
    wrapper.setState({
      question: 'Something',
      questionTitle: 'Something',
      questionType: 0,
      startDate: '2020-03-28T15:42:43',
      endDate: '2020-03-29T15:42:43',
    });
    wrapper.instance().validateInputFields();
    expect(wrapper.state().error.type).toEqual('Please select the question type');
  });

  it('should contain an error when start date is the same as the end date', () => {
    wrapper.instance().compareDates(Date.now(), (Date.now() - 20000));
    expect(wrapper.state().error.date).toEqual('End date should be at least a day after start date');
  });

  it('should contain an error when start date is before today', () => {
    wrapper.instance().compareDates(new Date('2019-01-29'), new Date('2019-03-29'));
    expect(wrapper.state().error.date).toEqual('Start date cannot be past days');
  });

  it('should contain an error when end date is before today', () => {
    wrapper.instance().compareDates(Date.now(), new Date('2019-01-29'));
    expect(wrapper.state().error.date).toEqual('End date should be at least a day after today');
  });

  it('should throw an error when start date is incorrect', () => {
    wrapper.instance().compareDates(Date.now(), (Date.now() - 20000));
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
      startDate: '2020-03-28T15:42:43',
      endDate: '2020-03-29T15:42:43',
    });
    wrapper.instance().compareDates('2020-03-28', '2020-03-29');
    const spy = jest.spyOn(wrapper.instance(), 'createQuestion');
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call createQuestion when submit is clicked', () => {
    const props = {
      addQuestion: jest.fn(() =>
        Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] })),
      ),
    };
    wrapper = shallow(<AddQuestion {...props} refetch={jest.fn} />);
    wrapper.setState({
      question: 'Blabla',
      questionTitle: 'Something',
      questionType: 1,
      startDate: '2020-03-28T15:42:43',
      endDate: '2020-03-29T15:42:43',
    });
    const spy = jest.spyOn(wrapper.instance(), 'createQuestion');
    spy();
    expect(spy).toHaveBeenCalled();
  });
});
