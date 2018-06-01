import React from 'react';
import { shallow } from 'enzyme';

import Amenity from '../../src/components/Amenity';

describe('Tests for Amenity Component', () => {
  const amenity = {
    name: 'AmenityName',
    rooms: 8,
  };

  const shalloWrapper = shallow(<Amenity amenity={amenity} />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });
});
