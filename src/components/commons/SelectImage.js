import React from 'react';
import { Button } from '../../../node_modules/react-toolbox/lib/button';

import '../../assets/styles/selectImage.scss';
import placeholder from '../../assets/images/placeholder.svg';

const SelectImage = () => (
  <div className="image-select">
    <div className="thumbnail">
      <div className="placeholder">
        <img src={placeholder} alt="Room Thumbnail" />
      </div>
    </div>
    <div className="select-button">
      <span>Upload a room thumbnail</span>
      <Button label="Select Image" />
    </div>
  </div>
);

export default SelectImage;
