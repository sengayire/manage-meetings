import toastr from 'toastr';
import * as firebase from 'firebase';
import notification from '../../utils/notification';
import config from '../../utils/FirebaseConfig';

firebase.initializeApp(config);

/**
 * This is responsible for getting the
 * URL of the image being uploaded
 *
 * @param {string} folderName
 * @param {File} imageFile
 *
 * @returns {Function} storageRef
 */
const getImageUrl = (folderName, imageFile) => {
  const storageRef = firebase.storage().ref(folderName + imageFile.name);

  return storageRef
    .put(imageFile)
    .then(() => storageRef.getDownloadURL().then(url => url))
    .catch(() => notification(toastr, 'error', 'Could not upload the image')());
};

export default getImageUrl;
