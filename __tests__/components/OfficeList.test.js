import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import renderer from 'react-test-renderer';

import SettingsOffices, { OfficeList } from '../../src/components/OfficeList';
import { GET_ALL_OFFICES } from '../../src/graphql/queries/Offices';

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
  loading: false,
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

  it('renders the offices', async () => {
    const officeMocks = {
      request: {
        query: GET_ALL_OFFICES,
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
});
