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
    withChildren: false,
    hideDropdownMenu: true,
  };

  const wrapper = mount(<Sort {...props} />);

  it('should render component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display the option in a dropdown menu component', () => {
    wrapper.setProps({
      ...props,
      withChildren: true,
    });
    expect(wrapper.find('.filter-options').length).toEqual(1);
    expect(wrapper.find('.filter-options').text()).toEqual('role');
  });
});
