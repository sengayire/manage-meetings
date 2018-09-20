import React from 'react';
import { shallow } from 'enzyme';

import FilterRoomMenu from '../../../src/components/rooms/FilterRoomMenu';

describe('AddRoomMenu', () => {
  const wrapper = shallow(<FilterRoomMenu />);

  it('should render properly', () => {
    const preventDefault = jest.fn();
    wrapper.instance().handleInputChange({ preventDefault });
    expect(wrapper).toMatchSnapshot();
  });
});
