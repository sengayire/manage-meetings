import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponse, { starRate } from '../../../src/components/roomFeedback/RoomFeedbackResponse';

const props = {
  roomFeedbackResponse: {
    id: 1,
    room: 'Olkaria',
    responses: 25,
    rating: 4,
    missingItems: '2 out of 10',
    suggestion: 'The substring() method returns the part of the string between the start and end indexes, or to the end of the string.',
  },
};

describe('Room Feedback', () => {
  it('should find Olkaria', () => {
    const wrapper = shallow(<RoomFeedbackResponse {...props} />);
    const text = wrapper.find('span').first().text();
    expect(text).toEqual('Olkaria');
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
});
