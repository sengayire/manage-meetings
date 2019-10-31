import React from 'react';
import { shallow } from 'enzyme';
import RoomsStructurePreview from '../../../src/components/onboarding/meetingRoomsSetup/RoomsStructurePreview';
import MeetingRoomsSetup from '../../../src/components/onboarding/meetingRoomsSetup/index';


describe('Setup component', () => {
  const wrapper = shallow(<RoomsStructurePreview />);
  const wrapper1 = shallow(<MeetingRoomsSetup />);
  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render properly', () => {
    expect(wrapper1).toMatchSnapshot();
  });
});

