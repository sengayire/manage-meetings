import toastr from 'toastr';
import * as firebase from 'firebase';
import notification from '../../utils/notification';
import config from '../../utils/FirebaseConfig';

firebase.initializeApp(config);

const getImageUrl = (folderName, imageFile) => {
  const storageRef = firebase.storage().ref(folderName + imageFile.name);

  return storageRef.put(imageFile)
    .then(() => (storageRef.getDownloadURL().then(url => url)))
    .catch(err => (notification(toastr, 'error', err)()));
};

export default getImageUrl;
