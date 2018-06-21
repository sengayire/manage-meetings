import React from 'react';
import { shallow, mount } from 'enzyme';

import ResourceList from '../../src/components/ResourceList';
import Resource from '../../src/components/Resource';
import data from '../../__mocks__/data';

describe('Tests for ResourceList Component', () => {
  const wrapper = shallow(<ResourceList />);
  const mountWrapper = mount(<ResourceList />);

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render `Add Amenities` button', () => {
    expect(wrapper.find('AddResource')).toHaveLength(1);
  });
  it('should respond to delete click event', () => {
    wrapper.instance().deleteResource(data.Resource);
    expect(wrapper.state('deleteModal')).toEqual(true);
  });
  it('should close the modal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('deleteModal')).toEqual(false);
  });
  it('should render the `Resource`, which lists out amenities', () => {
    expect(mountWrapper.find(Resource)).toHaveLength(6);
  });
});
