import React from 'react';

import doorIcon from '../../../assets/images/DOOR.svg';
import '../../../assets/styles/officeStructure.scss';

const OfficeStructurePreview = () => (
  <div>
    <p className="set-structure-title">
      {"Here's a preview of your setup"}
    </p>
    <img src={doorIcon} alt="door icon" />
  </div>
);

export default OfficeStructurePreview;
