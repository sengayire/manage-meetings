import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { MockedProvider } from 'react-apollo/test-utils';
import DeleteResourceComponent, { DeleteResource } from '../../../src/components/resources/DeleteResource';
import { DELETE_RESOURCE_MUTATION } from '../../../src/graphql/mutations/resources';

describe('DeleteResource Test Suite', () => {
  const request = {
    query: DELETE_RESOURCE_MUTATION,
    variables: { resourceId: 1 },
  };
  const deleteResource = { name: 'Duster', id: '1' };
  const result = { data: { deleteResource } };

  const props = {
    toDelete: {
      name: 'Duster',
      id: '1',
    },
    getResourcesQuery: {
      refetch: jest.fn(),
    },
  };

  const wrapperCode = (
    <MockedProvider mocks={[{ request, result }]} addTypename={false}>
      <DeleteResourceComponent {...props} />
    </MockedProvider>
  );
  const wrapper = mount(wrapperCode);
  const deleteComponent = wrapper.find('DeleteResource');

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pop up a modal when delete button is clicked', () => {
    const modalButton = wrapper.find('#modal-button');

    modalButton.simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should change modal state', () => {
    deleteComponent.instance().state = {
      closeModal: true,
    };
    deleteComponent.instance().handleCloseModal();
    expect(deleteComponent.instance().state.closeModal).toBeFalsy();
  });

  it('should delete resource succesfully', () => {
    const preventDefault = jest.fn();
    const newProps = {
      deleteResource: jest.fn(() => Promise.resolve(result)),
      toDelete: {
        id: '1',
        name: 'Duster',
      },
      refetch: jest.fn(),
    };
    const newWrapper = shallow(<DeleteResource {...newProps} />);
    newWrapper.setState({ closeModal: false });
    newWrapper.instance().handleDeleteResource({ preventDefault });
    expect(newProps.deleteResource).toHaveBeenCalled();
  });

  it('should return an error when deleting resource', () => {
    const preventDefault = jest.fn();
    const newProps = {
      deleteResource: jest
        .fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('You are not authorized to perform this action')] }))),
      toDelete: {
        id: '1',
        name: 'Duster',
      },
    };
    const newWrapper = shallow(<DeleteResource {...newProps} />);
    newWrapper.instance().handleDeleteResource({ preventDefault });
    expect(newProps.deleteResource).toHaveBeenCalled();
  });
});
