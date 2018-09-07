import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../node_modules/react-toolbox/lib/button';

import '../../assets/styles/selectImage.scss';
import placeholder from '../../assets/images/placeholder.svg';

const SelectImage = (props) => {
  const { onChange, thumbnailName, imageUrl } = props;
  return (
    <div className="image-select">
      <div className="thumbnail">
        { imageUrl === ''
        ? <div className="placeholder"><img src={placeholder} alt="Placeholder" /></div>
        : <img className="uploaded" src={imageUrl} alt="Room Thumbnail" />
          }
      </div>
      <div className="select-button">
        <span>{thumbnailName}</span>
        <Button label="Select Image" id="upload_widget_opener" />
        <div className="invisible-input">
          <input
            type="file"
            name="selectImage"
            onChange={onChange}
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
