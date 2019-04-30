/* eslint-disable */
/**
 * toastr => This is the toastr module imported from 'toastr' npm package
 * notifyType => This is the notification type (success or error)
 * message => This is the notification message
 *
 * How to use this function
 * const notify = notification(toastr, 'success', 'noficationMessage');
 * notify()
 */
const notification = (toastr, notifyType, message) => {
  toastr['options'] = {
    'closeButton': true,
    'positionClass': 'toast-top-center',
    'preventDuplicates': true,
    'onclick': null,
    'showDuration': '300',
    'hideDuration': '1000',
    'timeOut': '2000',
    'extendedTimeOut': '100',
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut',
    "newestOnTop": true,
  };
  return () => toastr[notifyType](message);
};

export default notification;
