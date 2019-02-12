import React from 'react';
import { shallow } from 'enzyme';
import { EditCenter } from '../../../src/components/centers/EditCenter';

describe('Edit center component', () => {
  const initialProps = {
    editCenter: jest.fn(),
    refetch: jest.fn(),
    centerName: 'Kampla',
    abbreviation: 'KLA',
    centerId: '1',
    user: { user: { location: 'kampala' } },
  };
  let wrapper = shallow(<EditCenter {...initialProps} />);
  const preventDefault = jest.fn();
  it('renders without failing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set closeModal state to true', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should set closeModal state to false', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should change state for centerName to LAGOS', () => {
    wrapper.find('#centerName').simulate('change', { target: { name: 'centerName', value: 'LAGOS' } });
    expect(wrapper.find('#centerName').props().value).toBe('LAGOS');
  });

  it('should call editCenter with set variables when the promise resolves', () => {
    const props = {
      editCenter: jest.fn(() => Promise.resolve()),
      refetch: jest.fn(),
      user: { user: { location: 'kampala' } },
      centerId: '1',
    };
    wrapper = shallow(<EditCenter {...props} />);
    wrapper.setState({
      centerName: 'Kampala',
      country: '232',
      abbreviation: 'KLA',
    });
    const variables = {
      abbreviation: 'KLA',
      country: 'Uganda',
      locationId: '1',
      name: 'Kampala',
    };
    wrapper.instance().handleEditCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(props.editCenter).toHaveBeenCalledWith({ variables });
  });

  it('should call editLocation with set variables when promise is rejected', () => {
    const editProps = {
      editCenter: jest.fn(() => Promise.reject()),
      refetch: jest.fn(),
      user: { user: { location: 'kampala' } },
      centerId: '1',
    };
    wrapper = shallow(<EditCenter {...editProps} />);
    wrapper.setState({
      centerName: 'Kampala',
      abbreviation: 'KLA',
    });
    const variables = {
      abbreviation: 'KLA',
      country: 'Uganda',
      locationId: '1',
      name: 'Kampala',
    };
    wrapper.instance().handleEditCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(editProps.editCenter).toHaveBeenCalledWith({ variables });
  });

  it('should not close modal when locationName and abbreviation fields are empty', () => {
    const updateData = {
      centerName: '',
      abbreviation: '',
      centerId: '1',
      user: { user: { location: 'kampala' } },
    };
    wrapper = shallow(<EditCenter {...updateData} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleEditCenter');
    wrapper.instance().handleEditCenter({ preventDefault });
    expect(spy).toBeCalled();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should not close modal when abbreviation validation fails', () => {
    wrapper.setState({
      centerName: 'Kampala', abbreviation: '', centerId: '1',
    });
    wrapper.instance().handleEditCenter({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
  });
});
