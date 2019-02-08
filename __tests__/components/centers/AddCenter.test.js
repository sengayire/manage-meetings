import React from 'react';
import { shallow } from 'enzyme';
import { AddCenter } from '../../../src/components/centers/AddCenter';

describe('AddCenter Component', () => {
  const initProps = {
    addCenter: jest.fn(),
    refetch: jest.fn(),
    user: { user: { location: 'kampala' } },
  };
  let wrapper = shallow(<AddCenter {...initProps} />);
  const preventDefault = jest.fn();

  it('renders AddCenter Component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have empty centerName value', () => {
    expect(wrapper.state().centerName).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD CENTER');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should change centerName to KAMPALA', () => {
    wrapper.find('#centerName').simulate('change', { target: { name: 'centerName', value: 'KAMPALA' } });
    expect(wrapper.find('#centerName').props().value).toBe('KAMPALA');
  });

  it('should close modal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should change closeModal state', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when centerName validation fails', () => {
    const modalForm = wrapper.find('form');
    wrapper.setState({ centerName: '' });
    modalForm.simulate('submit', {
      preventDefault: () => {
      },
    });
    wrapper.instance().handleAddCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when country validation fails', () => {
    wrapper.setState({ centerName: 'Kampala', country: '' });
    wrapper.instance().handleAddCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when abbreviation validation fails', () => {
    wrapper.setState({
      centerName: 'Kampala', country: 'Uganda', timeZone: 'UTC +1', abbreviation: '',
    });
    wrapper.instance().handleAddCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should call addCenter with set variables when promise is rejected', () => {
    const props = {
      addCenter: jest.fn(() => Promise.reject()),
      refetch: jest.fn(),
      user: { user: { location: 'kampala' } },
    };
    wrapper = shallow(<AddCenter {...props} />);
    wrapper.setState({
      centerName: 'Kampala',
      abbreviation: 'KLA',
    });
    const variables = {
      abbreviation: 'KLA',
      country: 'Uganda',
      name: 'Kampala',
      timeZone: 'EAST_AFRICA_TIME',
    };
    wrapper.instance().handleAddCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(props.addCenter).toHaveBeenCalledWith({ variables });
  });

  it('should call addCenter with set variables', () => {
    const props = {
      addCenter: jest.fn(() => Promise.resolve()),
      refetch: jest.fn(),
      user: { user: { location: 'kampala' } },
    };
    wrapper = shallow(<AddCenter {...props} />);
    wrapper.setState({
      centerName: 'Kampala',
      country: '232',
      abbreviation: 'KLA',
    });
    const variables = {
      abbreviation: 'KLA',
      country: 'Uganda',
      name: 'Kampala',
      timeZone: 'EAST_AFRICA_TIME',
    };
    wrapper.instance().handleAddCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(props.addCenter).toHaveBeenCalledWith({ variables });
  });
});
