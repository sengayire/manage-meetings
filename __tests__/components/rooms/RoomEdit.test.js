import React from 'react';
import { shallow } from 'enzyme';
import RoomSetup from '../../../src/components/rooms/RoomSetup';

describe('Test for edit room component', () => {
  it("should render roomsetup with edit room in it's dom", () => {
    const wrapper = shallow(<RoomSetup />);
    expect(wrapper).toMatchSnapshot();
  });
});
