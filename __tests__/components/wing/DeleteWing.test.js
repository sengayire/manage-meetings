import React from 'react';
import { shallow } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { DeleteWing } from '../../../src/components/wing/DeleteWing';

describe('Delete Wing Test Suite', () => {
  const initProps = {
    deleteWing: jest.fn(),
    wingName: 'Nothern',
    wingId: '11',
  };
  let wrapper = shallow(<DeleteWing {...initProps} />);

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().closeModal).toEqual(false);
  });

  it('should have a title prop', () => {
    expect(wrapper.prop('title')).toEqual('DELETE WING');
  });

  it('should have a buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Delete');
  });

  it('should handle state change', () => {
    // Change the state of the modal to `Closed`
    wrapper.instance().handleCloseModal();
    // After a state change and expect state to toggle
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('It should initiate a call to deleteWing when handleDeleteWing is called', () => {
    const props = {
      deleteWing: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] }))),
      notification: jest.fn(),
      wingName: 'ABUJA WING',
      id: 'delete-modal',
      wingId: '11',
    };
    wrapper = shallow(<DeleteWing {...props} />);

    wrapper.instance().handleDeleteWing();
    expect(props.deleteWing).toBeCalled();
  });

  it('should handle handleDeleteWing() when deleteWing is resolved', () => {
    const wing = {
      data: {
        deleteWing: {
          wing: {
            name: 'ABUJA WING',
          },
        },
      },
    };
    const props = {
      deleteWing: jest.fn(() => Promise.resolve(wing)),
      notification: jest.fn(),
      wingName: 'ABUJA WING',
      id: 'delete-modal',
      wingId: '11',
    };
    wrapper = shallow(<DeleteWing {...props} />);

    wrapper.instance().handleDeleteWing();
    expect(props.deleteWing).toBeCalled();
  });
});
