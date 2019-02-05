import React from 'react';
import { shallow } from 'enzyme';
import { AddFloorMenu } from '../../../src/components/floors/AddFloorMenu';

describe('Test the AddFloor component', () => {
  const props = {
    user: {
      user: {
        location: 'Nairobi',
      },
    },
    allBlocks: {
      allBlocks: [
        {
          id: 1,
          name: 'Kampala',
          offices: {
            id: '2',
            location: { name: 'Nairobi' },
          },
        },
      ],
      loading: false,
      error: undefined,
    },
    refetch: jest.fn(),
  };
  const wrapper = shallow(<AddFloorMenu {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
