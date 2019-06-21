import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import CheckBoxSlide, { updateCache, updateStatus } from '../../../src/components/commons/CheckboxSlide';
import notification from '../../../src/utils/notification';
import { UPDATE_QUESTION_STATUS_MUTATION } from '../../../src/graphql/mutations/Question';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../../src/graphql/queries/questions';

jest.mock('../../../src/utils/notification');

describe('Unit test for the CheckboxSlide component', () => {
  notification.mockImplementation(() => () => {});
  const classList = ['checked'];
  const event = {
    target: {
      nextSibling: {
        classList: {
          contains: arg => arg === 'checked',
          add: arg => classList.push(arg),
          remove: arg => classList.pop(arg),
        },
      },
    },
  };
  describe('Unit test for the updateCache method', () => {
    const store = {
      readQuery: jest.fn().mockImplementation(() => ({
        questions: {
          questions: {
            find: jest.fn().mockImplementation(() => ({ isActive: null })),
          },
        },
      })),
      writeQuery: jest.fn(),
    };
    it('should update store', () => {
      const dataReturned = { data: { updateQuestion: { question: { isActive: false } } } };
      updateCache(store, dataReturned, 2);
      expect(store.writeQuery).toHaveBeenCalled();
    });
  });
  describe('Unit tests for the updateStatus method', () => {
    it('should remove the checked class and call the mutation method when we deactivate a checkbox', () => {
      expect(classList[0]).toBe('checked');
      const mutation = jest.fn();
      updateStatus(event, mutation);
      expect(mutation.mock.calls.length).toBe(1);
      expect(classList[0]).not.toBe('checked');
      expect(notification).toHaveBeenCalled();
      classList[0] = 'checked';
    });
    it('should add the false class attribute and call the mutation method when we deactivate a checkbox', () => {
      expect(classList[0]).toBe('checked');
      const mutation = jest.fn();
      updateStatus(event, mutation);
      expect(mutation.mock.calls.length).toBe(1);
      expect(classList[0]).toBe('false');
    });
    it('should add the checked class and call the mutation method when we activate a checkbox', () => {
      expect(classList[0]).toBe('false');
      const mutation = jest.fn();
      event.target.nextSibling.classList.contains = arg => arg !== 'checked';
      updateStatus(event, mutation);
      expect(mutation.mock.calls.length).toBe(1);
      expect(classList[0]).toBe('checked');
      expect(notification).toHaveBeenCalled();
      classList[0] = 'false';
    });
    it('should remove the false class attribute, and call the mutation method when we activate a checkbox/question', () => {
      expect(classList[0]).toBe('false');
      const mutation = jest.fn();
      event.target.nextSibling.classList.contains = arg => arg !== 'checked';
      updateStatus(event, mutation);
      expect(mutation.mock.calls.length).toBe(1);
      expect(classList[0]).toBe('checked');
    });
  });
  describe('Unit test for the CheckboxSlider', () => {
    const props = {
      isChecked: false,
      questionId: 2,
      actionToPerform: 'mutation',
      mutationQuery: UPDATE_QUESTION_STATUS_MUTATION,
      updateQuery: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
    };
    const mocks = [{
      request: {
        query: UPDATE_QUESTION_STATUS_MUTATION,
        variables: { isActive: !props.isChecked, questionId: props.questionId },
      },
      result: { data: { updateQuestion: { question: { isActive: true, question: 'my-question' } } } },
    }, {
      request: {
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
      },
      result: {
        data: { questions: { questions: { id: '2' } } },
      },
    }];
    it('should render a span, a label, and an input tag', () => {
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false} >
          <CheckBoxSlide {...props} />
        </MockedProvider>,
      );
      const component = wrapper.find('CheckboxSlide');
      expect(component.find('input').length).toBe(1);
      expect(component.find('span').length).toBe(1);
      expect(component.find('label').length).toBe(1);
    });
  });
});
