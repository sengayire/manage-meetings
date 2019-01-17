import toastr from 'toastr';
import notification from '../../utils/notification';

/**
 *
 * This functions handles all the validations and
 * returns descriptive error messages
 *
 * @param {object} state
 *
 * @returns {void}
 */
const hasInvalidInputs = (state) => {
  const re = /^[A-Za-z]+[\s-\w]*/;

  if (state.roomName !== undefined && state.roomName.trim() === '') {
    notification(toastr, 'error', 'Room name should not be empty')();
    return true;
  } else if (state.roomName !== undefined && !re.test(state.roomName.trim())) {
    notification(
      toastr,
      'error',
      'Room name should start with a letter and contain only alphanumeric characters',
    )();
    return true;
  } else if (state.uploading !== undefined && state.uploading) {
    notification(toastr, 'error', 'Still uploading thumbnail')();
    return true;
  } else if (state.imageUrl !== undefined && state.imageUrl === '') {
    notification(toastr, 'error', 'You should upload a thumbnail')();
    return true;
  } else if (state.roomCapacity !== undefined && state.roomCapacity === 0) {
    notification(toastr, 'error', 'You should add room capacity')();
    return true;
  } else if (state.roomCapacity !== undefined && state.roomCapacity < 0) {
    notification(toastr, 'error', 'Room capacity cannot be below 0')();
    return true;
  } else if (state.roomFloor !== undefined && state.roomFloor === 0) {
    notification(toastr, 'error', 'You should select a floor')();
    return true;
  } else if (state.roomWing !== undefined && state.roomWing === 0) {
    notification(toastr, 'error', 'You should select a wing')();
    return true;
  }
  return false;
};
export { hasInvalidInputs as default };
