import React from 'react';
import { shallow } from 'enzyme';

import ResourceList from '../../src/components/ResourceList';
import Resource from '../../src/components/Resource';

describe('Tests for ResourceList Component', () => {
  const wrapper = shallow(<ResourceList />);

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render `AddResource` component', () => {
    expect(wrapper.find('AddResource')).toHaveLength(1);
  });
  it('should render the `Resource`, which lists out resources', () => {
    expect(wrapper.find(Resource)).toHaveLength(6);
  });
});
