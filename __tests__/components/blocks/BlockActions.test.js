import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { BlockActions } from '../../../src/components/blocks/BlockActions';
import blockData from '../../../src/fixtures/blocksData';
import officeData from '../../../src/fixtures/officeData';
import notification from '../../../src/utils/notification';

const props = {
  office: officeData,
  block: blockData,
  addBlock: jest.fn(),
  editBlock: jest.fn(),
  deleteBlock: jest.fn(),
};
const event = {
  preventDefault: jest.fn(),
  target: {
    name: '',
    value: '',
  },
};

describe('BlockActions Component', () => {
  let wrapper;
  let instance;
  let mountedComponent;
  let mountedInstance;

  beforeEach(() => {
    wrapper = shallow(<BlockActions {...props} />);
    instance = wrapper.instance();
    jest.spyOn(instance, 'handleCloseModal');
    jest.spyOn(instance, 'handleDeleteBlock');
    jest.spyOn(instance, 'handleFormInputChange');
    jest.spyOn(instance, 'handleModalStateChange');
    jest.spyOn(instance, 'toggleLoading');

    mountedComponent = mount(<BlockActions {...props} />);
    mountedInstance = mountedComponent.instance();
    jest.spyOn(mountedInstance, 'handleModalStateChange');
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders div modal', () => {
    const modal = wrapper.dive().find('.modal-form');
    expect(modal).toHaveLength(1);
  });

  it('should set blockName to state on click', () => {
    const toTarget = { target: { name: 'blockName', value: 'block Test' } };
    wrapper
      .dive()
      .find('#blockName')
      .simulate('change', toTarget);
    expect(wrapper.state('blockName')).toBe('block Test');
  });

  it('should update closeModal state', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should close modal', () => {
    wrapper.setState({
      closeModal: true,
    });
    wrapper.update();
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should render Editing Modal', () => {
    wrapper.setProps({ editing: true });
    wrapper.update();
    const form = wrapper.dive().find('.modal-form');
    expect(form).toHaveLength(1);
  });

  it('should render Deleting modal', () => {
    wrapper.setProps({ deleting: true });
    wrapper.update();
    const blockName = wrapper.dive().find('[title="DELETE Block"]');
    expect(blockName).toHaveLength(1);
  });

  it('should close the modal when the addBlock call fails and blockName is not provided', () => {
    wrapper.setProps({
      addBlock: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] }))),
      office: {},
    });
    wrapper.setState({
      blockName: '',
    });
    wrapper.update();
    wrapper.instance().handleAddBlock(event);
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should close the modal when the addBlock call fails and blockName is provided', () => {
    wrapper.setProps({
      addBlock: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] }))),
    });
    wrapper.setState({
      blockName: 'Test SingleBlock',
    });
    wrapper.update();
    wrapper.instance().handleAddBlock(event);
    expect(instance.toggleLoading).toBeCalled();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should resolve addBlock', () => {
    const newProps = {
      addBlock: jest.fn(() => Promise.resolve()),
      office: officeData,
      block: blockData,
      editBlock: jest.fn(),
      deleteBlock: jest.fn(),
    };
    wrapper = shallow(<BlockActions {...newProps} />);
    wrapper.setState({
      blockName: 'Sample SingleBlock',
    });
    wrapper.update();
    wrapper.instance().handleAddBlock(event);
    expect(newProps.addBlock).toBeCalled();
  });

  it('should close the modal when the editBlock call fails and blockName is not provided', () => {
    wrapper.setProps({
      editBlock: jest.fn(() => Promise.reject().catch(() => {})),
      office: {},
      block: {},
    });
    wrapper.setState({
      blockName: '',
    });
    wrapper.update();
    wrapper.instance().handleEditBlock(event);
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should close the modal when the editBlock call fails and office is not provided', () => {
    notification.default = jest.fn();
    wrapper.setProps({
      editBlock: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] }))),
      office: {},
    });
    wrapper.setState({
      blockName: 'Test SingleBlock',
    });
    wrapper.update();
    wrapper.instance().handleEditBlock(event);
    expect(instance.toggleLoading).toBeCalled();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should call editBlock when handleEditBlock is called', () => {
    const newProps = {
      editBlock: jest.fn(() => Promise.resolve()),
      office: officeData,
      block: blockData,
      addBlock: jest.fn(),
      deleteBlock: jest.fn(),
    };
    wrapper = shallow(<BlockActions {...newProps} />);
    wrapper.setState({
      blockName: 'Sample SingleBlock',
    });
    wrapper.update();
    wrapper.instance().handleEditBlock(event);
    expect(newProps.editBlock).toBeCalled();
  });

  it('should close the modal when the deleteBlock call fails and block is not provided', () => {
    wrapper.setProps({
      deleteBlock: jest.fn(() => Promise.reject()),
      block: {},
    });
    wrapper.update();
    wrapper.instance().handleDeleteBlock(event);
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should close the modal when the deleteBlock call fails and block is provided', () => {
    const error = new Error('There is an error while carrying out this operation');
    error.graphQLErrors = [{ message: ['error'] }];
    wrapper.setProps({
      deleteBlock: jest.fn(() => Promise.reject(error)),
      block: blockData,
    });
    wrapper.update();
    wrapper.instance().handleDeleteBlock(event);
    expect(instance.toggleLoading).toBeCalled();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should resolve deleteBlock', () => {
    const newProps = {
      deleteBlock: jest.fn(() => Promise.resolve()),
      office: officeData,
      block: blockData,
      addBlock: jest.fn(),
      editBlock: jest.fn(),
    };
    wrapper = shallow(<BlockActions {...newProps} />);
    wrapper.instance().handleDeleteBlock(event);
    expect(newProps.deleteBlock).toBeCalled();
  });
});
