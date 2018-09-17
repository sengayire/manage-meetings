import React from 'react';
import { shallow } from 'enzyme';
import { AddOffice } from '../../src/components/AddOffice';

describe('AddOffice Component', () => {
  const initProps = {
    addOffice: jest.fn(),
  };
  let wrapper = shallow(<AddOffice {...initProps} />);
  const preventDefault = jest.fn();


  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().officeName).toEqual('');
    expect(wrapper.state().officeLocation).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD OFFICE');
  });

  it('includes buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Add Office');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#officeName').simulate('change', { target: { name: 'officeName', value: 'epic' } });
    expect(wrapper.find('#officeName').props().value).toBe('epic');
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('hanlde handleAddOffice when officeName is required', () => {
    wrapper.instance().handleAddOffice({ preventDefault });
    wrapper.setState({ officeLocation: '1', officeName: '' });
    wrapper.instance().handleAddOffice({ preventDefault });
  });

  it('handles handleAddOffice() when addOffice is rejected', () => {
    const props = {
      addOffice: jest.fn(() => Promise.reject()),
    };
    wrapper = shallow(<AddOffice {...props} />);

    wrapper.setState({
      officeLocation: 1,
      officeName: 'Epic Tower',
    });

    const variables = {
      locationId: 1,
      name: 'Epic Tower',
    };

    wrapper.instance().handleAddOffice({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addOffice).toHaveBeenCalledWith({ variables });
  });

  it('handles handleAddOffice() when addOffice is resolved', () => {
    const mockOffice = {
      data: {
        createOffice: {
          office: {
            name: 'Epic Towers',
          },
        },
      },
    };
    const props = {
      addOffice: jest.fn(() => Promise.resolve(mockOffice)),
    };
    wrapper = shallow(<AddOffice {...props} />);

    wrapper.setState({
      officeLocation: 1,
      officeName: 'Epic Tower',
    });

    const variables = {
      locationId: 1,
      name: 'Epic Tower',
    };

    wrapper.instance().handleAddOffice({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addOffice).toHaveBeenCalledWith({ variables });
  });
});
