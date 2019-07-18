import React, { Fragment } from 'react';
import Tip from './Tooltip';


/**
* It displays an image that has a onClick function and tooltip text
* @param {func} - Function to clear filter
* @param {string} - Tooltip text
* @param {img} - Image to display
* @param {string} - Styling for the image
* @returns {img}
*/
const removeFilter = (clearFunction, tooltipText, displayImage, classStyle) => {
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  const image = (<img
    className={`${classStyle}`}
    src={displayImage}
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
