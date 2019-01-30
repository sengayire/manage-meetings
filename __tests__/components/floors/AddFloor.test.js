import React from 'react';
import { shallow } from 'enzyme';
import { AddFloor } from '../../../src/components/floors/AddFloor';

describe('AddFloor Component', () => {
  const initProps = {
    addFloor: jest.fn(() => Promise.resolve()),
    allBlocks: { loading: false, allBlocks: [{ offices: { name: 'block A' } }] },
    theOffice: 'The crest',
    refetch: jest.fn(),
    blocks: [{
      name: 'blockA',
      id: '12',
    }],
  };
  let wrapper = shallow(<AddFloor {...initProps} />);
  const preventDefault = jest.fn();

  it('renders the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().floorName).toEqual('');
    expect(wrapper.state().blockId).toEqual('');
  });

  it('includes the title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD FLOOR');
  });

  it('includes the buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('The crest');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#floorName').simulate('change', { target: { name: 'floorName', value: 'first floor' } });
    expect(wrapper.find('#floorName').props().value).toBe('first floor');
  });

  it('should close the modal ', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should toggle the state of the modal', () => {
    expect(wrapper.state('closeModal')).toEqual(true);
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('handles floorName validation when floorName is not provided', () => {
    wrapper.instance().handleAddFloor({ preventDefault });
    wrapper.setState({ blockId: '1', floorName: '' });
    wrapper.instance().handleAddFloor({ preventDefault });
    expect(wrapper.state().floorName).toEqual('');
  });

  it('should call addFloor with the correct variables', () => {
    const props = {
      addFloor: jest.fn(() => Promise.reject()),
      allBlocks: { loading: true, allBlocks: [{ offices: { name: 'block A' } }] },
      theOffice: 'The crest',
      refetch: jest.fn(),
      blocks: [{
        name: 'blockA',
        id: '12',
      }],
    };
    wrapper = shallow(<AddFloor {...props} />);
    wrapper.setState({
      blockId: 1,
      floorName: 'second floor',
    });
    const variables = {
      blockId: 1,
      name: 'second floor',
    };
    wrapper.instance().handleAddFloor({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(props.addFloor).toHaveBeenCalledWith({ variables });
  });

  it('should make a request to add a floor with the correct variables', () => {
    const mockFloor = {
      data: {
        addFloor: {
          floor: {
            name: 'second floor',
          },
        },
      },
    };
    const props = {
      addFloor: jest.fn(() => Promise.resolve(mockFloor)),
      allBlocks: { loading: false, allBlocks: [{ offices: { name: 'block A' } }] },
      theOffice: 'The crest',
      refetch: jest.fn(),
      blocks: [{
        name: 'blockA',
        id: '12',
      }],
    };
    wrapper = shallow(<AddFloor {...props} />);
    wrapper.setState({
      blockId: 1,
      floorName: 'second floor',
    });
    const variables = {
      blockId: 1,
      name: 'second floor',
    };
    wrapper.instance().handleAddFloor({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(props.addFloor).toHaveBeenCalledWith({ variables });
  });
});
