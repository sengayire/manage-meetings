import React from 'react';
import { shallow } from 'enzyme';
import { WingList } from '../../../src/components/wing/wingList';
import defaultUserRole from '../../../src/fixtures/user';
import ErrorIcon from '../../../src/components/commons/ErrorIcon';

describe('Tests for SettingOffices', () => {
  const props = {
    allWings: {
      allWings: [{ name: 'epic', id: 1 }],
    },
    data: {
      user: {
        location: '',
      },
    },
  };
  const shalloWrapper = shallow(<WingList {...props} user={defaultUserRole} />);

  it('renders the snapshot correctly', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle WingList component', () => {
    expect(props.allWings.allWings).toHaveLength(1);
  });

  it('should render an error incase it occurs', () => {
    const initialprops = {
      allWings: {
        error: { message: 'An error has occurred' },
      },
      user: { roles: [{ id: 1, name: 'default' }], location: 'Nairobi' },
    };
    const component = shallow(<WingList {...initialprops} />);
    expect(component.find(ErrorIcon)).toHaveLength(1);
  });

  it('it should render the Spinner when loading prop is true', () => {
    const loadingProps = {
      allWings: {
        loading: true,
        error: undefined,
      },
    };

    const component = shallow(<WingList {...loadingProps} />);
    expect(component.find('Spinner')).toHaveLength(1);
  });
});
