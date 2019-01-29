import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';

import SettingsOffices, { OfficeList } from '../../../src/components/offices/OfficeList';
import { GET_ALL_OFFICES } from '../../../src/graphql/queries/Offices';

const props = {
  allOffices: {
    allOffices: {
      offices: [{
        id: '11',
        name: 'Epic Tower',
        location: {
          name: 'LAGOS',
          timeZone: 'WEST',
        },
      }],
    },
  },
  data: {
    loading: false,
    refetch: jest.fn(),
    fetchMore: jest.fn(() => Promise.resolve()),
  },
};

describe('Tests for SettingOffices', () => {
  const shalloWrapper = shallow(<SettingsOffices />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle OfficeList component', () => {
    shallow(<OfficeList {...props} />);
    expect(props.allOffices.allOffices.offices).toHaveLength(1);
  });

  it('should render an error screen', async () => {
    const officeListErrorMocks = {
      request: {
        query: GET_ALL_OFFICES,
        variables: {
          page: 1,
          perPage: 5,
        },
      },
      error: { message: 'An error occured' },
    };
    const errorWrapper = renderer.create(
      <MockedProvider mocks={[officeListErrorMocks]} addTypename={false}>
        <SettingsOffices {...props} />
      </MockedProvider>);
    await wait(0);
    expect(errorWrapper.toJSON().children).toContain('Network error: An error occured');
  });

  it('renders the offices', async () => {
    const officeMocks = {
      request: {
        query: GET_ALL_OFFICES,
        variables: {
          page: 1,
          perPage: 5,
        },
      },
      result: {
        data: {
          allOffices: {
            offices: [
              {
                id: '81',
                name: 'The Crest7',
                location: {
                  name: 'Kampala',
                  timeZone: 'TimeZoneType.EAST_AFRICA_TIME',
                },
              }],
            hasNext: false,
            hasPrevious: true,
            pages: 1,
            queryTotal: 1,
            __typename: 'PaginateOffices',
          },
        },
      },
    };

    const wrapper = renderer.create(
      <MockedProvider mocks={[officeMocks]} addTypename={false}>
        <SettingsOffices {...props} />
      </MockedProvider>);
    await wait(0);

    expect(wrapper.toJSON().children[1].children[0].children[2].children.length).toBe(1);
  });

  it('should toggle the state when handleData is called', () => {
    const officeProps = {
      data: {
        fetchMore: jest.fn(() => Promise.resolve()),
        refetch: jest.fn(),
        allOffices: {
          offices: [
            {
              id: '81',
              name: 'The Crest7',
              location: {
                name: 'Kampala',
                timeZone: 'TimeZoneType.EAST_AFRICA_TIME',
              },
            }],
          hasNext: false,
          hasPrevious: true,
        },
      },
    };
    const wrapper = shallow(<OfficeList {...officeProps} />);
    wrapper.instance().handleData();
    expect(wrapper.state('isFetching')).toBe(true);
  });
});
