import React from 'react';
import PropTypes from 'prop-types';
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
  const { onChange, thumbnailName, imageUrl } = props;
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
            onChange={onChange}
            // hidden
          />
        </div>
      </div>
    </div>
  );
};
SelectImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  thumbnailName: PropTypes.string,
  imageUrl: PropTypes.string,
};
SelectImage.defaultProps = {
  thumbnailName: 'Upload a thumbnail',
  imageUrl: '',
};
export default SelectImage;
