import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { AddRoomNairobi } from '../../../src/components/rooms/AddRoomNairobi';
import ADD_ROOM_ST_CATHERINE from '../../../src/graphql/mutations/rooms/AddRoomStCatherine';
import { addRoom, variables } from '../../../__mocks__/rooms/AddRoomNairobi';


describe('AddRoomNairobi', () => {
  const request = {
    query: ADD_ROOM_ST_CATHERINE,
    variables: { ...variables },
  };
  const result = { ...addRoom };

  const props = {
    createRoom: jest.fn(() => Promise.resolve(result)),
    validate: jest.fn(() => Promise.resolve('valid')),
  };

  const wrapperCode = (
    <MockedProvider
      mocks={[
        { request, result },
      ]}
      addTypename={false}
    >
      <AddRoomNairobi {...props} />
    </MockedProvider>
  );
  const wrapper = mount(wrapperCode);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not have a form before modal pops up', () => {
    expect(wrapper.find('form')).toHaveLength(0);
  });


  it('should pop up a modal when modal button is clicked', () => {
    const modalButton = wrapper.find('#modal-button');
    expect(modalButton).toHaveLength(1);

    modalButton.simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have two select and two text input elements', () => {
    expect(wrapper.find('Input').length).toBe(2);
    expect(wrapper.find('SelectInput').length).toBe(2);
  });


  it('should handle change in roomName', () => {
    wrapper.find('input#roomName')
      .simulate('change', { target: { name: 'roomName', value: 'Accra' } });
    wrapper.update();
    expect(wrapper.find('input#roomName').prop('defaultValue')).toEqual('Accra');
  });

  it('should handle change in roomCapacity', () => {
    wrapper.find('input#roomCapacity')
      .simulate('change', { target: { name: 'roomCapacity', value: 2 } });
    wrapper.update();
    expect(wrapper.find('input#roomCapacity').prop('defaultValue')).toEqual(2);
  });

  it('should handle change when office Block A is selected', () => {
    wrapper.find('select#officeBlock')
      .simulate('change', { target: { name: 'officeBlock', value: 'A' } });
    wrapper.update();
    expect(wrapper.find('select#officeBlock').prop('value')).toEqual('A');
  });

  it('should handle change when office Block B is selected', () => {
    wrapper.find('select#officeBlock')
      .simulate('change', { target: { name: 'officeBlock', value: 'B' } });
    wrapper.update();
    expect(wrapper.find('select#officeBlock').prop('value')).toEqual('B');
  });

  it('should handle change in officeFloor', () => {
    wrapper.find('select#officeFloor')
      .simulate('change', { target: { name: 'officeFloor', value: 'First Floor' } });
    wrapper.update();
    expect(wrapper.find('select#officeFloor').prop('value')).toEqual('First Floor');
  });


  it('should  have form and close the modal when the form is submitted', () => {
    const preventDefault = jest.fn();
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);

    form.simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(wrapper.find('form')).toHaveLength(0);
  });

  it('should return a notification when a room is added succesfully', () => {
    const preventDefault = jest.fn();
    const newProps = {
      createRoom: jest.fn(() => Promise.resolve(result)),
    };
    const newWrapper = shallow(<AddRoomNairobi {...newProps} />);
    const newState = {
      roomName: 'Test room 1',
      roomCapacity: 3,
      officeFloor: '2',
      officeBlock: '2',
      imageUrl: 'test/image',
    };

    newWrapper.setState({ ...newState });
    newWrapper.instance().handleAddRoom({ preventDefault });
    expect(newProps.createRoom).toHaveBeenCalledWith({ variables });
  });

  it('should return an error notification if an error was encountered', () => {
    const preventDefault = jest.fn();
    const errorProps = { createRoom: jest.fn(() => Promise.reject(new Error('Please supply a valid room name'))) };
    const newWrapper = shallow(<AddRoomNairobi {...errorProps} />);

    newWrapper.instance().handleAddRoom({ preventDefault });
    expect(props.createRoom).toHaveBeenCalled();
  });

  it('should upload an image', () => {
    const newWrapper = shallow(<AddRoomNairobi {...props} />);
    const images = [{
      name: 'image-name',
      type: 'image/jpeg',
      size: 1024,
      webKitRelativePath: '',
    }];

    newWrapper.instance().handleInputChange({ target: { name: 'selectImage', files: images } });
    expect(newWrapper.instance().state.thumbnailName).toEqual('image-name');
  });

  it('should display error on failure to upload image', () => {
    const newWrapper = shallow(<AddRoomNairobi {...props} />);
    const imageFiles = [
      {
        name: 'fail',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    newWrapper.instance().handleInputChange({ target: { name: 'selectImage', files: imageFiles } });
    expect(newWrapper.instance().state.thumbnailName).toEqual('fail');
  });

  it('should trim image name if it is too long', () => {
    const newWrapper = shallow(<AddRoomNairobi {...props} />);
    const images = [{
      name: 'image-name-is-very-long-to-be-included',
      type: 'image/jpeg',
      size: 1024,
      webKitRelativePath: '',
    }];

    newWrapper.instance().handleInputChange({ target: { name: 'selectImage', files: images } });
    expect(newWrapper.instance().state.thumbnailName).toEqual('image-name-is-very-lon...');
  });
});
