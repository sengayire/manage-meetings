import React from 'react';
import { shallow } from 'enzyme';
import { AddWing } from '../../src/components/addWing';

describe('AddWing Component', () => {
  const initProps = {
    addWing: jest.fn(),
    allFloors: { allFloors: [] },
  };
  let wrapper = shallow(<AddWing {...initProps} />);
  const preventDefault = jest.fn();


  it('renders the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().name).toEqual('');
    expect(wrapper.state().floorId).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD WING');
  });

  it('includes buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Add Wing');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#wingName').simulate('change', { target: { name: 'wingName', value: 'state' } });
    wrapper.setState({ name: 'state', floorId: 1 });
    expect(wrapper.state.name).toBe('state');
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('hanlde handleAddWing when  wingName is required', () => {
    wrapper.setState({ name: '', floorId: '1' });
    wrapper.instance().handleAddWing({ preventDefault });
  });

  it('handles handleAddWing() when addWing is rejected', () => {
    const props = {
      addWing: jest.fn(() => Promise.reject()),
      allFloors: { allFloors: [] },
    };
    wrapper = shallow(<AddWing {...props} />);

    wrapper.setState({
      floorId: 1,
      name: 'North wing',
    });

    const variables = {
      floorId: 1,
      name: 'North wing',
    };

    wrapper.instance().handleAddWing({ preventDefault });
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addWing).toHaveBeenCalledWith({ variables });
  });

  it('handles handleWing() when addWing is resolved', () => {
    const mockWing = {
      data: {
        createWing: {
          wing: {
            name: 'Southern wing',
          },
        },
      },
    };
    const props = {
      addWing: jest.fn(() => Promise.resolve(mockWing)),
      allFloors: { allFloors: [] },
    };
    wrapper = shallow(<AddWing {...props} />);

    wrapper.setState({
      floorId: 1,
      name: 'Southern wing',
    });

    const variables = {
      floorId: 1,
      name: 'Southern wing',
    };

    wrapper.instance().handleAddWing({ preventDefault });
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addWing).toHaveBeenCalledWith({ variables });
  });
});
