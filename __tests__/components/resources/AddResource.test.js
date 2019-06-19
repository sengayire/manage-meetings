import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import AddResourceComponent, { AddResource } from '../../../src/components/resources/AddResource';

describe('AddResource Component', () => {
  const initProps = {
    addResourceMutation: jest.fn(),
    data: {
      allRooms: {
        rooms: [],
      },
    },
    userLocation: {
      location: 'Nairobi',
    },
    refetch: jest.fn(),
  };

  const { MRM_API_URL } = process.env || {};

  const httpLink = createHttpLink({
    uri: MRM_API_URL,
    fetch,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  let addResourceWrapper;
  let wrapper;

  beforeEach(() => {
    addResourceWrapper = mount(<AddResource {...initProps} />);

    wrapper = mount(
      <ApolloProvider client={client}>
        <AddResourceComponent />
      </ApolloProvider>,
    );
  });

  afterEach(() => {
    addResourceWrapper.unmount();
  });

  const wrapperCode = (
    <MockedProvider>
      <AddResource {...initProps} />
    </MockedProvider>
  );

  it('renders properly', () => {
    expect(wrapperCode).toMatchSnapshot();
  });

  it('renders properly', () => {
    addResourceWrapper.instance().handleCloseModal();
    expect(addResourceWrapper.state('closeModal')).toEqual(true);
  });

  it('opens up the add resource modal on clicking add resource button', () => {
    wrapper.find('#modal-button').simulate('click');
    expect(wrapper.find('Modal')).toBeTruthy();
  });

  it('should call handleInputChange on editing resource name input', () => {
    const spy = jest.spyOn(addResourceWrapper.instance(), 'handleInputChange');
    addResourceWrapper.instance().forceUpdate();
    addResourceWrapper.find('#modal-button').simulate('click');
    const resourceNameInput = addResourceWrapper.find('input[type="text"]');
    resourceNameInput.simulate('change', { target: { name: 'amenity', value: 'value' } });
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleAddAmenity on submission', () => {
    const mockResource = {
      data: {
        createResource: {
          resource: {
            name: 'Eraser',
          },
        },
      },
    };

    const props = {
      addResourceMutation: jest.fn(() => Promise.resolve(mockResource)),
      data: {
        allRooms: {
          rooms: [],
        },
        fetchMore: jest.fn(() => Promise.resolve()),
      },
      userLocation: {
        location: 'Nairobi',
      },
    };

    const myWrapper = mount(<AddResource {...props} />);
    const spy = jest.spyOn(myWrapper.instance(), 'handleAddAmenity');
    myWrapper.instance().forceUpdate();

    myWrapper.find('#modal-button').simulate('click');
    const resourceForm = myWrapper.find('form');
    resourceForm.at(0).simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });

  it('Still calls handleAddAmenity on reject', () => {
    const props = {
      addResourceMutation: jest.fn(() => Promise.reject()),
      data: {
        allRooms: {
          rooms: [],
        },
        fetchMore: jest.fn(() => Promise.resolve()),
      },
      userLocation: {
        location: 'Kampala',
      },
    };

    const myWrapper = mount(<AddResource {...props} />);
    const spy = jest.spyOn(myWrapper.instance(), 'handleAddAmenity');
    myWrapper.instance().forceUpdate();

    myWrapper.find('#modal-button').simulate('click');
    const resourceForm = myWrapper.find('form');
    resourceForm.at(0).simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });
});
