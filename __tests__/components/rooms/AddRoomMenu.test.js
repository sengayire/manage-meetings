import React from 'react';
import { shallow } from 'enzyme';

import AddRoomMenu from '../../../src/components/rooms/AddRoomMenu';

describe('AddRoomMenu', () => {
  const wrapper = shallow(<AddRoomMenu />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
