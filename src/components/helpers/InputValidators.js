import toastr from 'toastr';
import notification from '../../utils/notification';

const hasInvalidInputs = (state) => {
  const re = /^[\w\-\s]+$/;

  if (state.roomName.trim() === '') {
    notification(toastr, 'error', 'Room name should not be empty')();
    return true;
  } else if (!re.test(state.roomName.trim())) {
    notification(toastr, 'error', 'Only letters and numbers allowed for room name)')();
    return true;
  } else if (state.uploading) {
    notification(toastr, 'error', 'Still uploading thumbnail')();
    return true;
  } else if (state.imageUrl === '') {
    notification(toastr, 'error', 'You should upload a thumbnail')();
    return true;
  } else if (state.roomCapacity === 0) {
    notification(toastr, 'error', 'You should add room capacity')();
    return true;
  } else if (state.roomCapacity < 0) {
    notification(toastr, 'error', 'Room capacity cannot be below 0')();
    return true;
  } else if (state.roomFloor === 0) {
    notification(toastr, 'error', 'You should select a floor')();
    return true;
  } else if (state.roomWing === 0) {
    notification(toastr, 'error', 'You should select a wing')();
    return true;
  }
  return false;
};
export { hasInvalidInputs as default };
