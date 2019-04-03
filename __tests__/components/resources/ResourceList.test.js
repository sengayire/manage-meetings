import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import ResourceLists, { ResourceList } from '../../../src/components/resources/ResourceList';
import { GET_RESOURCES_QUERY } from '../../../src/graphql/queries/Resources';
import allResources from '../../../__mocks__/resources/Resources';

describe('Tests for ResourceList Component', () => {
  const request = {
    query: GET_RESOURCES_QUERY,
    variables: {
      page: 1,
      perPage: 5,
    },
  };
  const result = { ...allResources };
  const error = 'Something Went Wrong';
  const wrapper = (
    <MockedProvider mocks={[{ request, result }]} addTypename>
      <ResourceLists
        client={{ query: jest.fn().mockImplementationOnce(() => Promise.resolve({ data: { user: 'userDetails' } })) }}
      />
    </MockedProvider>);
  const mountWrapper = mount(wrapper);

  it('renders correctly from memory', () => {
    expect(mountWrapper).toMatchSnapshot();
  });

  it('renders the loading screen', () => {
    expect(mountWrapper.find('ResourceList').props().data.loading).toBe(true);
  });

  it('should render an error screen', async () => {
    const errorWrapper = (
      <MockedProvider mocks={[{ request, error }]} addTypename>
        <ResourceLists
          client={{ query: jest.fn().mockImplementationOnce(() => Promise.resolve({ data: { user: 'userDetails' } })) }}
        />
      </MockedProvider>);
    const mountErrorWrapper = mount(errorWrapper);
    // check whether there is no error when loading
    expect(mountErrorWrapper.find('ResourceList').props().data.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));
    mountErrorWrapper.update();
    // check whether an error occurs after loading
    expect(mountErrorWrapper.find('ResourceList').props().data.error).toBeTruthy();
    expect(mountErrorWrapper.find('ResourceList').props().data.error.networkError).toBe(error);
  });

  it('should have all data passed as props', () => {
    mountWrapper.update();
    expect(mountWrapper.find('ResourceList')).toHaveLength(1);
    expect(mountWrapper.find('ResourceList').prop('data').allResources.resources.length).toEqual(allResources.data.allResources.resources.length);
  });

  it('should handle handleData function', () => {
    const props = {
      data: {
        allResources: {
          resources: [],
        },
        fetchMore: jest.fn(() => Promise.resolve()),
      },
      userLocation: {
        user: {
          location: 'Kampala',
        },
      },
      loading: false,
      error: {},
      client: { query: jest.fn() },
    };
    const wrapperCode = shallow(<ResourceList {...props} />);
    expect(wrapperCode.instance().handleData(5, 1));
  });

  it('should render the DataNotFound component when there is no data in the database', () => {
    const props = {
      data: {
        loading: false,
        error: { message: 'GraphQL error: No more resources' },
        fetchMore: jest.fn(() => Promise.resolve()),
      },
      client: {},
    };
    const component = shallow(<ResourceList {...props} />);
    expect(component.find('DataNotFound')).toHaveLength(1);
  });
});
