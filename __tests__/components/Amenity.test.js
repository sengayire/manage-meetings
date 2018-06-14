import React from 'react';
import { shallow } from 'enzyme';

import Amenity from '../../src/components/Amenity';

describe('Tests for Amenity Component', () => {
  const amenity = {
    name: 'AmenityName',
    rooms: 8,
  };

  const shallowWrapper = shallow(<Amenity amenity={amenity} doDelete={() => {}} />);

  it('renders correctly from memory', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
