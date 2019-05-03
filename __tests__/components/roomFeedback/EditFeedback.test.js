import React from 'react';
import { shallow } from 'enzyme';
import { EditFeedback } from '../../../src/components/roomFeedback/EditFeedback';

describe('Unit tests for the EditFeedback Component', () => {
  const props = {
    question: 'sample question',
    questionId: '16',
    questionType: 'Rate',
    questionTitle: 'Sample question title',
    startDate: '2019-03-28T15:42:43',
    endDate: '2019-03-29T15:42:43',
    editFeedbackQuestion: jest.fn(),
    isActive: false,
  };

  const wrapper = shallow(<EditFeedback {...props} />);

  it('should return the time when a date is passed to getTime method', () => {
    const expectedTime = EditFeedback.getTime(props.startDate);
    expect(expectedTime).toEqual('15:42');
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should toggle the state of isLoading', () => {
    expect(wrapper.state('isLoading')).toEqual(false);
    wrapper.instance().toggleLoading();
    expect(wrapper.state('isLoading')).toEqual(true);
  });

  it('should toggle the state of calenderOpen', () => {
    expect(wrapper.state('calendarOpen')).toEqual(false);
    wrapper.instance().calenderToggle();
    expect(wrapper.state('calendarOpen')).toEqual(true);
  });

  it('should toggle the state of sendDateData', () => {
    wrapper.instance().sendDateData('JAN 13 2019', 'Feb 15 2019');
    expect(wrapper.state('startDate')).toEqual('JAN 13 2019');
    expect(wrapper.state('endDate')).toEqual('Feb 15 2019');
  });

  it('should change the state of question when a user types in the question input field', () => {
    expect(wrapper.state('question')).toEqual('sample question');
    const event = { target: { name: 'question', value: 'my question' } };
    wrapper.instance().handleInputChange(event);
    expect(wrapper.state('question')).toEqual('my question');
  });

  it('should format the date and time passed to formatDateTime', () => {
    const response = wrapper.instance().formatDateTime('JAN 10 2019', '10:23');
    expect(response).toBe('2019-01-10T10:23:00');
  });

  it('should set the appropriate error when the inputErrors method is called', () => {
    jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().inputErrors('custom error key', 'custom error message');
    expect(wrapper.instance().setState).toBeCalled();
  });

  describe('Unit test for validating the modal input fields before sending a request', () => {
    jest.spyOn(wrapper.instance(), 'compareDates').mockImplementationOnce(() => jest.fn());

    it('should show an error message when the question field is empty', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      wrapper.setState({ question: '' });
      const response = wrapper.instance().validateInputFields();
      expect(response.key).toEqual('question');
      expect(response.msg).toEqual('Please provide the feedback question');
      mockInputError.mockRestore();
    });

    it('should show an error message when the questionType field is empty', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      wrapper.setState({ questionType: '', question: 'my question' });
      const response = wrapper.instance().validateInputFields();
      expect(response.key).toEqual('questionType');
      expect(response.msg).toEqual('Please select a question type');
      mockInputError.mockRestore();
    });

    it('should show an error message when the questionTitle field is empty', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      wrapper.setState({ questionTitle: '', questionType: 'my question type', question: 'my question' });
      const response = wrapper.instance().validateInputFields();
      expect(response.key).toEqual('questionTitle');
      expect(response.msg).toEqual('Please provide the title of the question');
      mockInputError.mockRestore();
    });

    it('should call compareDates method when there are no errors in the input fields of the modal', () => {
      wrapper.setState({
        questionTitle: 'my question title', questionType: 'Rate', question: 'my question',
      });
      wrapper.instance().validateInputFields();
      expect(wrapper.instance().compareDates.mock.calls.length).toEqual(1);
    });
  });

  describe('Unit test for validating the date and time selected in the modal', () => {
    jest.spyOn(wrapper.instance(), 'editQuestion').mockImplementationOnce(() => jest.fn());

    it('should show an error message when the start date is in the past', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      const response = wrapper.instance().compareDates(new Date('2019-02-14'), new Date('2019-02-15'));
      expect(response.key).toEqual('date');
      expect(response.msg).toEqual('Start date cannot be in the past');
      mockInputError.mockRestore();
    });

    it('should show an error message when end date is in the past', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      const response = wrapper.instance().compareDates(Date.now(), new Date('2019-02-15'));
      expect(response.key).toEqual('date');
      expect(response.msg).toEqual('End date should be at least a day after today');
      mockInputError.mockRestore();
    });

    it('should show an error message when end date is behind start date', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      const response = wrapper.instance().compareDates(Date.now(), (Date.now() - 20000));
      expect(response.key).toEqual('date');
      expect(response.msg).toEqual('End date should be at least a day after the start date');
      mockInputError.mockRestore();
    });

    it('should call editQuestion method when start and end date are valid', () => {
      const mockInputError = jest.spyOn(wrapper.instance(), 'inputErrors')
        .mockImplementationOnce((key, msg) => ({ key, msg }));
      wrapper.instance().compareDates(Date.now(), (Date.now() + 20000));
      expect(wrapper.instance().editQuestion.mock.calls.length).toEqual(1);
      mockInputError.mockRestore();
    });
  });

  it('should persist the edited question when the modal is edited correctly', () => {
    props.editFeedbackQuestion = jest.fn().mockImplementationOnce(() => Promise.resolve());
    const newWrapper = shallow(<EditFeedback {...props} />);
    jest.spyOn(newWrapper.instance(), 'handleCloseModal').mockImplementationOnce(() => jest.fn());
    jest.spyOn(newWrapper.instance(), 'toggleLoading').mockImplementationOnce(() => jest.fn());
    newWrapper.instance().editQuestion();
    expect(newWrapper.instance().toggleLoading.mock.calls.length).toBe(1);
  });

  it('should catch any error thrown when trying to persist date to the backend', () => {
    props.editFeedbackQuestion = jest.fn().mockImplementationOnce(() => Promise.reject());
    const newWrapper = shallow(<EditFeedback {...props} />);
    jest.spyOn(newWrapper.instance(), 'handleCloseModal').mockImplementationOnce(() => jest.fn());
    jest.spyOn(newWrapper.instance(), 'toggleLoading').mockImplementationOnce(() => jest.fn())
      .mockImplementationOnce(() => jest.fn());
    newWrapper.instance().editQuestion();
    expect(newWrapper.instance().toggleLoading.mock.calls.length).toBe(1);
  });

  it('should make the "EDIT QUESTION" button not visible when no change is made in the modal', () => {
    wrapper.setState({ showEditQuestionButton: true });
    jest.spyOn(wrapper.instance(), 'updatedModalState').mockImplementationOnce(() => ({
      question: 'sample question',
      questionType: 'Rate',
      questionTitle: 'Sample question title',
      startDate: '2019-03-28T15:42:43',
      endDate: '2019-03-29T15:42:43',
      endTime: '15:42',
      startTime: '15:42',
    }));
    wrapper.instance().handleShowEditQuestionButton();
    expect(wrapper.state('showEditQuestionButton')).toEqual(false);
  });
});
