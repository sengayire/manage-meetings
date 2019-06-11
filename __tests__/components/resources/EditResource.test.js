import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { MockedProvider } from 'react-apollo/test-utils';
import WrappedEditResource, { EditResource } from '../../../src/components/resources/EditResource';
import allResourcesReturnData from '../../../__mocks__/resources/Resources';
import { GET_RESOURCES_QUERY } from '../../../src/graphql/queries/Resources';
import { EDIT_RESOURCE_MUTATION } from '../../../src/graphql/mutations/resources';

describe('Edit a resource', () => {
  const mutationResult = {
    data: {
      updateRoomResource: {
        resource: {
          name: 'Point',
        },
      },
    },
  };

  const getResourceResult = {
    data: {
      allResources: {
        resources: allResourcesReturnData.data.allResources.resources,
      },
    },
  };

  const mocks = [
    {
      request: {
        query: GET_RESOURCES_QUERY,
      },
      result: getResourceResult,
    },
    {
      request: {
        query: EDIT_RESOURCE_MUTATION,
        variables: {
          name: 'Point',
        },
      },
      result: mutationResult,
    },
  ];

  const props = {
    editResource: jest.fn(Promise.resolve(mutationResult)),
    refetch: jest.fn(),
    resource: {
      id: '3',
      name: 'pointers',
    },
  };

  describe('Wrapped component', () => {
    const setup =
      (
        <MockedProvider
          mocks={mocks}
          addTypename={false}
        >
          <WrappedEditResource
            {...props}
          />
        </MockedProvider>);
    const wrapperForFunctionality = mount(setup);

    const upDatedResource = {
      preventDefault: jest.fn(),
      target: {
        name: '',
      },
    };

    const wrapperValue = wrapperForFunctionality.find('EditResource');

    it('should return an error notification if an error was encountered', () => {
      const errorProps = {
        refetch: jest.fn(),
        resource: {
          id: '3',
          name: 'pointers',
        },
        editResource: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('An error occurred')] }))),
      };
      const newWrapper = shallow(<EditResource {...errorProps} />);
      newWrapper.instance().handleEditResource(upDatedResource);
      expect(errorProps.editResource).toHaveBeenCalled();
    });

    it('should return a notification when a room is edited succesfully', () => {
      const newProps = {
        roomName: 'Makers 3',
        roomId: 13,
        editResource: jest.fn(() => Promise.resolve(mutationResult)),
        handleEditResource: jest.fn(),
        refetch: jest.fn(),
        resource: {
          id: '3',
          name: 'Gulu',
          roomId: 1,
        },
      };
      const newWrapper = shallow(<EditResource {...newProps} />);
      const newState = {
        resourceName: 'Makers 6',
        roomId: 13,
        resourceId: '1',
      };
      newWrapper.setState({ ...newState });
      newWrapper.instance().handleEditResource(upDatedResource);
      expect(newProps.editResource).toBeCalled();
    });

    it('should call handleNameChange', () => {
      const action = wrapperValue.instance();
      const handleInputChange = jest.spyOn(wrapperValue.instance(), 'handleNameChange');
      action.handleNameChange(upDatedResource);
      expect(handleInputChange).toBeCalled();
    });

    it('should call handleCloseModal', () => {
      const action = wrapperValue.instance();
      const handleCloseModal = jest.spyOn(wrapperValue.instance(), 'handleCloseModal');
      action.handleCloseModal();
      expect(handleCloseModal).toBeCalled();
    });

    it('should call handleModalStateChange', () => {
      const action = wrapperValue.instance();
      const handleModalStateChange = jest.spyOn(wrapperValue.instance(), 'handleModalStateChange');
      action.handleModalStateChange();
      expect(handleModalStateChange).toBeCalled();
    });
  });
});
