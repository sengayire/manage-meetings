import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import notification from '../../utils/notification';
import { Button } from '../../../node_modules/react-toolbox/lib/button';
import '../../assets/styles/selectImage.scss';

/**
 *
 * Reusable Image Selector component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const SelectImage = (props) => {
  const imageInput = React.createRef();
  const handleInputChange = (event) => {
    const { target: { files } } = event;
    let isValidImage = true;
    let thumbnailName;

    /* validate image extension */
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (files.length > 0) {
      const fileType = files[0].type.split('/')[1];
      if (!allowedExtensions.exec(`.${fileType}`)) {
        /* notifiy user the file is not valid */
        isValidImage = false;
        notification(
          toastr,
          'error',
          'Please upload a jpeg, jpg, png, gif image format only',
        )();
        imageInput.current.value = '';
      }
    }

    /* validate image size */
    if (isValidImage) {
      if (files[0] && files[0].size > 204800) {
        isValidImage = false;
        /* notifiy user the file is too large */
        notification(
          toastr,
          'error',
          'Please upload a file that is smaller than 200kb.',
        )();
        imageInput.current.value = '';
      }
    }

    if (isValidImage && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      /* Shorten the length of the thumbnail name in case its too long */
      thumbnailName = files[0].name.length < 25 ? files[0].name
        : `${files[0].name.substring(0, 22)}...`;
      props.updateThumbnailState(files, imageUrl, thumbnailName);
    }
  };

  const { thumbnailName, imageUrl } = props;
  return (
    <div className="image-select">
      <div className="thumbnail">
        {imageUrl === '' ? (
          <div className="placeholder" />
        ) : (
          <img className="uploaded" src={imageUrl} alt="Room Thumbnail" />
        )}
      </div>
      <div className="select-button">
        <div>{thumbnailName}</div>
        <Button label="Select Image" id="upload_widget_opener" />
        <div className="invisible-input">
          <input
            type="file"
            name="selectImage"
            onChange={handleInputChange}
            ref={imageInput}
          />
        </div>
      </div>
    </div>
  );
};
SelectImage.propTypes = {
  updateThumbnailState: PropTypes.func.isRequired,
  thumbnailName: PropTypes.string,
  imageUrl: PropTypes.string,
};
SelectImage.defaultProps = {
  thumbnailName: 'Upload a thumbnail',
  imageUrl: '',
};
export default SelectImage;
