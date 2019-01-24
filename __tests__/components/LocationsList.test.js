import React from 'react';
import { shallow } from 'enzyme';
import { LocationsList } from '../../src/components/LocationsList';

const data = {
  allLocations: [
    {
      id: '1',
      name: 'Kampala',
      country: 'Type.Uganda',
      timeZone: 'UTC',
      abbreviation: 'KLA',
    },
  ],
};
let wrapper;

describe('Tests for LocationsList', () => {
  wrapper = shallow(<LocationsList data={data} />);

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders locations', () => {
    const list = wrapper.find(('.settings-locations-list'));
    expect(list).toHaveLength(1);
  });

  it('renders spinner when loading prop is false', () => {
    const props = {
      allLocations: [],
      loading: true,
    };
    wrapper = shallow(<LocationsList data={props} />);
    const list = wrapper.find(('Spinner'));
    expect(list).toHaveLength(1);
  });
});
