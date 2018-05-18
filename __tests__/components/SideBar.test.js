import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SideBar from '../../src/components/SideBar';

describe('SideBar Component', () => {
  const wrapper = shallow(<SideBar />);

  it('Should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SideBar />, div);
  });
  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
