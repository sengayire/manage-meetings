import React from 'react';
import { shallow } from 'enzyme';
import { AddFloorMenu } from '../../../src/components/floors/AddFloorMenu';

describe('Test the AddFloor component', () => {
  const props = {
    data: {
      allOffices: {
        offices: [
          {
            id: 1,
            name: 'Kampala',
            blocks: {
              name: 'blockA',
              id: 12,
            },
          },
        ],
      },
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
