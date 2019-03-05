import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import * as firebase from 'firebase';
import AddRoomToKampala, { AddRoomToTheCrest } from '../../../src/components/rooms/AddRoomToKampala';
import { GET_CREST_DETAILS } from '../../../src/graphql/queries/Offices';
import { ADD_ROOM_TO_CREST } from '../../../src/graphql/mutations/rooms/AddRoomToCrest';
import { crestOfficeDetails } from '../../../__mocks__/offices/Offices';
import AddRoomToCrest, { variables } from '../../../__mocks__/rooms/AddRoomToCrest';
import getImageUrl from '../../../src/components/helpers/ImageUpload';

jest.mock('../../../src/components/helpers/ImageUpload');
jest.mock('firebase');
firebase.storage = jest.fn(() => ({
  ref: jest.fn(() => ({
    // eslint-disable-next-line no-unused-vars
    put: (arg) => {
      Promise.resolve();
    },
  })),
}));
getImageUrl.mockImplementation(arg => Promise.resolve(arg));

describe('AddRoomToKampala', () => {
  const MockedCrest = (
    <MockedProvider
      mocks={[
        {
          request: {
            query: ADD_ROOM_TO_CREST,
            variables: { ...variables },
          },
          result: {
            ...AddRoomToCrest,
          },
      },
      {
        request: {
          query: GET_CREST_DETAILS,
        },
        result: crestOfficeDetails,
    },
      ]}
      addTypename={false}
    >
      <AddRoomToKampala />
    </MockedProvider>);

  const wrapper = mount(MockedCrest);
  // const theCrest = wrapper.find('AddRoomToTheCrest');
  let response;
  const mockProps = {
    officeDetails: {},
    crestMutation: jest.fn(() => Promise.resolve(response)),
  };
  const crestShallowWrapper = shallow(<AddRoomToTheCrest {...mockProps} />);

  beforeEach(() => {
    crestShallowWrapper.setState({
      imageUrl: '',
      roomName: '',
      remoteRoomName: '',
      roomFloor: 0,
      roomType: 'meeting',
      roomCalendar: 'andela.com1',
      floorOptions: [],
      roomCapacity: 0,
      closeModal: false,
      thumbnailName: 'Upload a thumbnail',
      officeId: 1,
    });
    mockProps.crestMutation.mockClear();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should add room name to state', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'roomName', value: 'room1' } });
    expect(crestShallowWrapper.state().roomName).toEqual('room1');
  });

  it('should handle change in remoteRoomName', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'remoteRoomName', value: 'Nairobi' } });
    expect(crestShallowWrapper.instance().state.remoteRoomName).toEqual('Nairobi');
  });

  it('should add room floor to state', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'roomFloor', value: '1' } });
    expect(crestShallowWrapper.state().roomFloor).toEqual(1);
    expect(crestShallowWrapper.state().roomFloor).not.toEqual('1');
  });

  it('should close modal', () => {
    crestShallowWrapper.instance().handleModalStateChange();
    expect(crestShallowWrapper.state().closeModal).toBeFalsy();
  });

  it('should close modal', () => {
    crestShallowWrapper.setState({
      closeModal: true,
    });
    crestShallowWrapper.instance().handleModalStateChange();
    expect(crestShallowWrapper.state().closeModal).toBeFalsy();
  });

  it('should add room capacity to state', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'roomCapacity', value: '10' } });
    expect(crestShallowWrapper.state().roomCapacity).toEqual(10);
    expect(crestShallowWrapper.state().roomCapacity).not.toEqual('10');
  });

  it('should increment room capacity to state', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'up' } }, 12);
    expect(crestShallowWrapper.state().roomCapacity).toEqual(12);
    expect(crestShallowWrapper.state().roomCapacity).not.toEqual('12');
  });

  it('should not increment room capacity when num value is undefined', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'up' } }, undefined);
    expect(crestShallowWrapper.state().roomCapacity).toEqual(0);
  });

  it('should add room capacity to state', () => {
    crestShallowWrapper.instance().handleInputChange({ target: { name: 'roomCapacity', value: '' } });
    expect(crestShallowWrapper.state().roomCapacity).toEqual(0);
  });

  it('should add image to state', async () => {
    window.URL.createObjectURL = jest.fn(() => 'upload/image-name');
    const files = [
      {
        name: 'image-name.jpeg',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    const imageUrl = 'upload/image-name.jpeg';
    const thumbnailName = 'image-name.jpeg';
    crestShallowWrapper.instance().updateThumbnailState(files, imageUrl, thumbnailName);
    expect(crestShallowWrapper.state().thumbnailName).toEqual('image-name.jpeg');
    expect(crestShallowWrapper.state().imageUrl).toEqual('upload/image-name.jpeg');
  });

  it('should not upload and image larger than 200k', async () => {
    window.URL.createObjectURL = jest.fn(() => '');
    const files = [
      {
        name: 'fail',
        type: 'image/jpeg',
        size: 3000024,
        webKitRelativePath: '',
      },
    ];
    await crestShallowWrapper.instance().handleAddRoom({ preventDefault: jest.fn(), target: { name: 'selectImage', files } });
    await new Promise(resolve => setTimeout(resolve));
    expect(crestShallowWrapper.state().imageUrl).toEqual('');
  });

  it('should create room', async () => {
    const preventDefault = jest.fn();
    crestShallowWrapper.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
    });
    await crestShallowWrapper.instance().handleAddRoom({ preventDefault });
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(mockProps.crestMutation).toHaveBeenCalled();
  });

  it('should not create room when some inputs are missing', async () => {
    const preventDefault = jest.fn();
    crestShallowWrapper.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
    });
    await crestShallowWrapper.instance().handleAddRoom({ preventDefault });
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(mockProps.crestMutation).not.toHaveBeenCalled();
  });
});
