import React from 'react';
import { shallow } from 'enzyme';
import { Floor } from '../../../src/components/floors/Floor';

describe('Floor component', () => {
  const props = {
    floor: {
      name: 'first floor',
    },
    refetch: jest.fn(),
  };
  it('renders correctly from memory', () => {
    const wrapper = shallow(<Floor {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
