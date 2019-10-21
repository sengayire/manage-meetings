import React from 'react';
import { shallow } from 'enzyme';
import Container from '../../../src/containers/mainContainer';

describe(' Container Component', () => {
  const wrapper = shallow(<Container SetSidebarOption={jest.fn()} />);

  it('renders properly', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('should display  title of the clicked side menu', () => {
    const links = [
      'home',
      'meeting',
      'insights',
      'setup',
      'devices',
      'resources',
      'people',
      'rooms',
    ];

    links.forEach((link) => {
      wrapper.instance().SetSidebarOption(link);
      expect(wrapper.state().sideBaroption).toEqual(link);
    });
  });
});
