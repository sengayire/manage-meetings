import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponse, { starRate } from '../../../src/components/roomFeedback/RoomFeedbackResponse';
import RoomFeedbackResponseList from '../../../src/components/roomFeedback/RoomFeedbackResponseList';

const props = {
  activeRoomId: null,
  roomFeedbackResponse: {
    id: 1,
    room: 'Olkaria',
    responses: 25,
    rating: 4,
    missingItems: '2 out of 10',
    suggestion:
      'The substring() method returns the part of the string between the start and end indexes, or to the end of the string.',
  },
  viewSingleFeed: jest.fn(),
};

describe('Room Feedback', () => {
  it('should find Olkaria', () => {
    const wrapper = shallow(<RoomFeedbackResponse {...props} />);
    const text = wrapper
      .find('span')
      .first()
      .text();
    expect(text).toEqual('Olkaria');
  });

  it('should be able to toggle modal state', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList />);
    const ResponseComponent = shallow(<RoomFeedbackResponse {...props} />);
    const ResponseListInstance = ResponseListComponent.instance();
    const ResponseInstance = ResponseComponent.instance();
    const fakeEvent = { preventDefault: () => {} };
    ResponseListInstance.showModal(fakeEvent);
    ResponseInstance.showModal(fakeEvent);
    expect(ResponseListComponent.state()).toEqual({ roomId: null, visible: true });
  });

  it('should change modal visibility to true', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList />);
    const ResponseListInstance = ResponseListComponent.instance();
    const fakeEvent = { preventDefault: () => {} };
    ResponseListInstance.showModal(fakeEvent, 1);
    expect(ResponseListComponent.state()).toEqual({ roomId: 1, visible: true });
  });

  it('should change modal visibility to false', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList />);
    const ResponseListInstance = ResponseListComponent.instance();
    const fakeEvent = { preventDefault: () => {} };
    ResponseListInstance.setState({ roomId: 1 });
    ResponseListInstance.showModal(fakeEvent, 1);
    expect(ResponseListComponent.state()).toEqual({ roomId: null, visible: false });
  });

  it('should return 5 default stars', () => {
    const stars5 = starRate();
    expect(stars5.starImage.length).toEqual(5);
  });

  it('should render 1 star', () => {
    const stars1 = starRate(1);
    expect(stars1.starImage.length).toEqual(5);
  });

  it('should render 2 stars', () => {
    const stars2 = starRate(2);
    expect(stars2.starImage.length).toEqual(5);
  });

  it('should render 3 stars', () => {
    const stars3 = starRate(3);
    expect(stars3.starImage.length).toEqual(5);
  });

  it('should render 4 stars', () => {
    const stars4 = starRate(4);
    expect(stars4.starImage.length).toEqual(5);
  });

  it('should render 5 stars', () => {
    const stars5 = starRate(5);
    expect(stars5.starImage.length).toEqual(5);
  });

  it('should not have an active class on initial page load', () => {
    const unClickedRoomFeedbackResponse = shallow(<RoomFeedbackResponse {...props} />);
    expect(unClickedRoomFeedbackResponse.find('.active')).toHaveLength(0);
  });

  it('should have an active class when it is clicked', () => {
    const activeProps = {
      activeRoomId: 1,
      roomFeedbackResponse: {
        id: 1,
        room: 'Olkaria',
        responses: 25,
        rating: 4,
        missingItems: '2 out of 10',
        suggestion:
          'The substring() method returns the part of the string between the start and end indexes, or to the end of the string.',
      },
      viewSingleFeed: jest.fn(),
    };

    const clickedRoomFeedbackResponse = shallow(<RoomFeedbackResponse {...activeProps} />);
    expect(clickedRoomFeedbackResponse.find('.active')).toHaveLength(1);
  });
});
