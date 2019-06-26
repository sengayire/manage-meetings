import React from 'react';
import { shallow } from 'enzyme';
import AddQuestionComponent from '../../src/components/roomFeedback/AddQuestion';
import RoomFeedbackPage from '../../src/containers/RoomFeedbackPage';
import Button from '../../src/components/commons/Button';
import { getUserDetails, getRoomFeedbackQuestions } from '../../src/components/helpers/QueriesHelpers';

jest.mock('../../src/components/helpers/QueriesHelpers');


describe('RoomFeedback component', () => {
  const questions = [{
    id: '1',
    questionId: '3',
    question: 'test question',
    questionTitle: 'my title',
    startDate: '2019-05-21 13:32:15.753',
    endDate: '2019-05-22 13:32:15.753',
    questionResponseCount: 2,
    questionType: 'test',
    isActive: true,
  }];
  let wrapper;
  beforeAll(() => {
    getRoomFeedbackQuestions.mockResolvedValue(questions);
    getUserDetails.mockResolvedValue({
      id: '214',
      roles: [{ id: 2, role: 'Admin' }],
    });
    wrapper = shallow(<RoomFeedbackPage />);
    wrapper.instance().getData(false);
  });

  it('should render RoomQuestions component with length of 1 ', () => {
    expect(wrapper.find('#questions').length).toEqual(1);
  });

  it('should display the addQuestion button', () => {
    expect(wrapper.find(AddQuestionComponent).length).toEqual(1);
  });

  it('should  change the value of isResponsePageVisible to true', () => {
    expect(wrapper.state().isResponsePageVisible).toEqual(false);
    wrapper.find(Button).at(1).dive().find('.responses-tab-nav')
      .simulate('click');
    expect(wrapper.state().isResponsePageVisible).toEqual(true);
  });

  it('should have a div with classname responsePage with length of 1 ', () => {
    wrapper.update();
    expect(wrapper.find('#responses').length).toEqual(1);
  });

  it('should populate the state with the data for room feedback responses', () => {
    const data = {
      responses: [
        {
          roomId: 191,
          roomName: 'Kigali',
          totalResponses: 40,
          totalRoomResources: 30,
        },
      ],
    };
    expect(wrapper.state().responseData).toEqual([]);
    wrapper.instance().checkData(data);
    expect(wrapper.state().responseData).toEqual(data.responses);
  });
});
