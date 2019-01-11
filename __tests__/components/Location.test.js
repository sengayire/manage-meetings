import React from 'react';
import { shallow } from 'enzyme';
import Location from '../../src/components/locations/Location';

describe('Location Component', () => {
  const location = {
    id: '1',
    name: 'Kampala',
    country: 'Type.Uganda',
    timeZone: 'UTC',
    abbreviation: 'KLA',
  };
  const roomWrapper = shallow(<Location location={location} />);

  it('renders the correct content', () => {
    const td = roomWrapper.find('td');
    expect(td).toHaveLength(3);
  });
});
