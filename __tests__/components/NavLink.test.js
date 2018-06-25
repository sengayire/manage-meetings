import React from 'react';
import { shallow, mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';
import Link from 'react-toolbox/lib/link';

import data from '../../__mocks__/data';
import NavLink from '../../src/components/helpers/NavLink';

describe('Tests for SettingOffices', () => {
  const wrapper = <NavLink to={data.routes.home} />;
  const shallowWrapper = shallow(wrapper);
  const mountWrapper = mount(<MemoryRouter>{wrapper}</MemoryRouter>);

  it('renders correctly from memory', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
  it('should render a `Route` component', () => {
    expect(shallowWrapper.find(Route)).toHaveLength(1);
  });
  it('should render a `Link` component', () => {
    expect(mountWrapper.find(Link)).toHaveLength(1);
  });
});
