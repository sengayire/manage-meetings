import React from 'react';
import { mount } from 'enzyme';
import Sort from '../../../src/components/commons/Sort';

describe('Sort Component', () => {
  const props = {
    fetchSortedData: jest.fn(),
    sortOptions: {
      role: [
        {
          id: '1',
          name: 'admin',
        },
        {
          id: '2',
          name: 'user',
        },
      ],
    },
    withChildren: true,
    hideDropdownMenu: false,
  };

  const wrapper = mount(<Sort {...props} />);

  it('should render component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display the option in a dropdown menu component', () => {
    wrapper.find('.dropdown-caret button').simulate('mousedown', {
      type: 'focus',
    });
    expect(wrapper.find('.filter-options').length).toEqual(1);
    expect(wrapper.find('.filter-options').text()).toEqual('role');
  });

  const newWrapper = mount(<Sort {...{ ...props, withChildren: false, hideDropdownMenu: true }} />);
  it('should not display the option in a dropdown menu component', () => {
    newWrapper.find('.dropdown-caret button').simulate('mousedown', {
      type: 'focus',
    });
    expect(newWrapper.find('.filter-options').length).toEqual(0);
  });
});
