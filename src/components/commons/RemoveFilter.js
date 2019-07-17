import React, { Fragment } from 'react';
import Tip from './Tooltip';
import clearImg from '../../assets/images/clearImg.png';


/**
* It handles resetting of filters
* @param {func} - Function to clear filter
* @param {string} - Tooltip text
* @returns {img}
*/
const removeFilter = (clearFunction, tooltipText) => {
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  const image = (<img
    className="reset-image"
    src={clearImg}
    alt={tooltipText}
    onKeyPress={clearFunction}
    onClick={clearFunction}
  />);

  return (
    <Fragment>
      <span>{Tip(tooltipText, image)}</span>
    </Fragment>
  );
};

export default removeFilter;
