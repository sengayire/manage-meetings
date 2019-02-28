import React from 'react';
import { shallow } from 'enzyme';
import Center from '../../../src/components/centers/Center';

describe('Location Component', () => {
  const refetch = jest.fn();
  const location = {
    id: '1',
    name: 'Kampala',
    country: 'Type.Uganda',
    timeZone: 'UTC',
    abbreviation: 'KLA',
  };
  const roomWrapper = shallow(<Center location={location} refetch={refetch} />);

  it('renders the correct content', () => {
    const td = roomWrapper.find('span');
    expect(td).toHaveLength(4);
  });
});
