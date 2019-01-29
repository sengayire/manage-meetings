import React from 'react';
import { shallow } from 'enzyme';
import AddFloorMenu from '../../../src/components/floors/AddFloorMenu';

const wrapper = shallow(<AddFloorMenu />);
describe('Test the AddFloor component', () => {
  it('should render corrently', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
