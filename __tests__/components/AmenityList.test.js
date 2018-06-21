import React from 'react';
import { shallow, mount } from 'enzyme';

import AmenityList from '../../src/components/AmenityList';
import Amenity from '../../src/components/Amenity';
import data from '../../__mocks__/data';

describe('Tests for AmenityList Component', () => {
  const wrapper = shallow(<AmenityList />);
  const mountWrapper = mount(<AmenityList />);

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render `Add Amenities` button', () => {
    expect(mountWrapper.find('#modal-button')).toHaveLength(1);
    expect(mountWrapper.find('#modal-button').text()).toBe('Add Amenities');
  });
  it('should respond to delete click event', () => {
    wrapper.instance().deleteResource(data.amenity);
    expect(wrapper.state('deleteModal')).toEqual(true);
  });
  it('should close the modal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('deleteModal')).toEqual(false);
  });
  it('should render the `Amenity`, which lists out amenities', () => {
    expect(mountWrapper.find(Amenity)).toHaveLength(6);
  });
});
