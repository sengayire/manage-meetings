import hasInvalidInputs from '../../../src/components/helpers/InputValidators';

describe('hasInvalidInputs', () => {
  const state = {
    imageUrl: '',
    roomName: '',
    roomFloor: 0,
    roomType: 'meeting',
    roomCalendar: 'andela.com1',
    floorOptions: [],
    roomCapacity: 0,
    roomWing: 0,
    uploading: false,
    wingsObject: {},
    wingOptions: [],
    closeModal: false,
    thumbnailName: 'Upload a thumbnail',
    officeId: 1,
  };


  it('should return true', () => {
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true', () => {
    state.roomName = 'room1';
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true when someone enters invalid room name', () => {
    state.roomName = '$$%';
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true if the image is still uploading', () => {
    state.roomName = 'room1';
    state.uploading = true;
    expect(hasInvalidInputs(state)).toBeTruthy();
    state.uploading = false;
  });

  it('should return true', () => {
    state.roomName = 'room1';
    state.imageUrl = 'path/to/image.jpg';
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true', () => {
    state.roomName = 'room1';
    state.imageUrl = 'path/to/image.jpg';
    state.roomCapacity = -2;
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true', () => {
    state.roomName = 'room1';
    state.imageUrl = 'path/to/image.jpg';
    state.roomCapacity = 1;
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true', () => {
    state.roomName = 'room1';
    state.imageUrl = 'path/to/image.jpg';
    state.roomCapacity = 1;
    state.roomFloor = 1;
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return true', () => {
    state.roomName = 'room1';
    state.imageUrl = 'path/to/image.jpg';
    state.roomCapacity = 1;
    state.roomFloor = 10;
    expect(hasInvalidInputs(state)).toBeTruthy();
  });

  it('should return false', () => {
    state.roomName = 'room1';
    state.imageUrl = 'path/to/image.jpg';
    state.roomCapacity = 1;
    state.roomFloor = 10;
    state.roomWing = 10;
    expect(hasInvalidInputs(state)).toBeFalsy();
  });
});
