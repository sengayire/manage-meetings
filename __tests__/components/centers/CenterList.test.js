import React from 'react';
import { shallow } from 'enzyme';
import defaultUserRole from '../../../src/fixtures/user';
import { CenterList } from '../../../src/components/centers/CenterList';

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
  refetch: jest.fn(),
};

let wrapper;

describe('Tests for CenterList', () => {
  wrapper = shallow(<CenterList data={data} user={defaultUserRole} />);

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
    wrapper = shallow(<CenterList data={props} user={{}} />);
    const list = wrapper.find(('Spinner'));
    expect(list).toHaveLength(1);
  });

  it('set user prop to empty', () => {
    const props = {
      allLocations: [],
      loading: false,
    };
    wrapper = shallow(<CenterList data={props} user={{}} />);
    expect(wrapper.props().user).toBeFalsy();
  });

  it('should render an error incase it occurs', () => {
    const props = {
      allLocations: [],
      loading: false,
      error: { message: 'An error has occurred' },
    };
    wrapper = shallow(<CenterList data={props} user={{}} />);
    expect(wrapper.find('div').text()).toBe('An error has occurred');
  });
});