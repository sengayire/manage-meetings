import React from 'react';
import { shallow } from 'enzyme';
import AddQuestionComponent from '../../src/components/roomFeedback/AddQuestion';
import RoomFeedbackPage from '../../src/containers/RoomFeedbackPage';
import Button from '../../src/components/commons/Button';

describe('RoomFeedback component', () => {
  const wrapper = shallow(<RoomFeedbackPage client={{}} />);

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
