import React from 'react';
import { shallow } from 'enzyme';
import { AddLocation } from '../../../src/components/locations/AddLocation';

describe('AddLocation Component', () => {
  const initProps = {
    addLocation: jest.fn(),
    refetch: jest.fn(),
    user: { user: { location: 'kampala' } },
  };
  let wrapper = shallow(<AddLocation {...initProps} />);
  const preventDefault = jest.fn();

  it('renders AddLocation Component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have empty locationName value', () => {
    expect(wrapper.state().locationName).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD LOCATION');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should change locationName to KAMPALA', () => {
    wrapper.find('#locationName').simulate('change', { target: { name: 'locationName', value: 'KAMPALA' } });
    expect(wrapper.find('#locationName').props().value).toBe('KAMPALA');
  });

  it('should close modal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should change closeModal state', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when locationName validation fails', () => {
    const modalForm = wrapper.find('form');
    wrapper.setState({ locationName: '' });
    modalForm.simulate('submit', {
      preventDefault: () => {
      },
    });
    wrapper.instance().handleAddLocation({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when country validation fails', () => {
    wrapper.setState({ locationName: 'Kampala', country: '' });
    wrapper.instance().handleAddLocation({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when abbreviation validation fails', () => {
    wrapper.setState({
      locationName: 'Kampala', country: 'Uganda', timeZone: 'UTC +1', abbreviation: '',
    });
    wrapper.instance().handleAddLocation({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should call addLocation with set variables when promise is rejected', () => {
    const props = {
      addLocation: jest.fn(() => Promise.reject()),
      refetch: jest.fn(),
      user: { user: { location: 'kampala' } },
    };
    wrapper = shallow(<AddLocation {...props} />);
    wrapper.setState({
      locationName: 'Kampala',
      abbreviation: 'KLA',
    });
    const variables = {
      abbreviation: 'KLA',
      country: 'Uganda',
      imageUrl: '',
      name: 'Kampala',
      timeZone: 'EAST_AFRICA_TIME',
    };
    wrapper.instance().handleAddLocation({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addLocation).toHaveBeenCalledWith({ variables });
  });

  it('should call addLocation with set variables', () => {
    const props = {
      addLocation: jest.fn(() => Promise.resolve()),
      refetch: jest.fn(),
      user: { user: { location: 'kampala' } },
    };
    wrapper = shallow(<AddLocation {...props} />);
    wrapper.setState({
      locationName: 'Kampala',
      country: '232',
      abbreviation: 'KLA',
    });
    const variables = {
      abbreviation: 'KLA',
      country: 'Uganda',
      imageUrl: '',
      name: 'Kampala',
      timeZone: 'EAST_AFRICA_TIME',
    };
    wrapper.instance().handleAddLocation({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
    expect(props.addLocation).toHaveBeenCalledWith({ variables });
  });
});
