import React from 'react';
import { shallow } from 'enzyme';
import TopNav from '../../../src/components/navbars/TopNav';

describe('TopNav Component', () => {
  const wrapper = shallow(<TopNav />);

  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the three links in the nav', () => {
    const menuText = ['Analytics', 'Settings', 'Room Feedback'];
    const navWrapper = wrapper.find('[type="horizontal"]').children();
    expect(navWrapper).toHaveLength(3);
    menuText.map((nav, index) => expect(navWrapper.at(index).props().label).toEqual(nav));
  });
});
