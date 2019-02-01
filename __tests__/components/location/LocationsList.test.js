import React from 'react';
import { shallow } from 'enzyme';
import defaultUserRole from '../../../src/fixtures/user';
import { LocationsList } from '../../../src/components/locations/LocationsList';

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
  loading: false,
};

let wrapper;

describe('Tests for LocationsList', () => {
  wrapper = shallow(<LocationsList data={data} user={defaultUserRole} />);

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
    wrapper = shallow(<LocationsList data={props} user={{}} />);
    const list = wrapper.find(('Spinner'));
    expect(list).toHaveLength(1);
  });

  it('set user prop to empty', () => {
    const props = {
      allLocations: [],
      loading: false,
    };
    wrapper = shallow(<LocationsList data={props} user={{}} />);
    expect(wrapper.props().user).toBeFalsy();
  });
});
