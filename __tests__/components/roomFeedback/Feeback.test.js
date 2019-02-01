import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import feedbacks from '../../../src/fixtures/roomFeebdack';
import defaultUserRole from '../../../src/fixtures/user';

describe('RoomFeeback Component', () => {
  const wrapper = mount(
    <Router>
      <RoomFeedback user={defaultUserRole} />
    </Router>,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a title of roomfeedback', () => {
    expect(wrapper.find('.menu-title').text()).toEqual('ROOM FEEDBACK');
  });

  it('should display the table containing the list of feedback', () => {
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('table tr')).toHaveLength(4);
  });

  it('should contain the right data in the right table cell', () => {
    expect(wrapper.find('tr').at(1).find('td').at(2)
      .text()).toEqual(feedbacks[0].responses);
    expect(wrapper.find('tr').at(1).find('td').at(0)
      .text()).toEqual(feedbacks[0].question);
    expect(wrapper.find('tr').at(2).find('td').at(1)
      .text()).toEqual(feedbacks[1].type);
    expect(wrapper.find('tr').at(2).find('td').at(3)
      .text()).toEqual(feedbacks[1].startDate);
  });

  it('should has empty user prop', () => {
    const roomFeedback = shallow(<RoomFeedback user={{}} />);
    expect(roomFeedback.props().user).toBeFalsy();
  });
});
