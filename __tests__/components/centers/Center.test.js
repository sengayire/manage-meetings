import React from 'react';
import { shallow } from 'enzyme';
import Center from '../../../src/components/centers/Center';

describe('Center Component', () => {
  const location = {
    id: '1',
    name: 'Kampala',
    country: 'Type.Uganda',
    timeZone: 'UTC',
    abbreviation: 'KLA',
  };
  const roomWrapper = shallow(<Center location={location} />);

  it('renders the correct content', () => {
    const td = roomWrapper.find('td');
    expect(td).toHaveLength(3);
  });
});
