import React, { Fragment } from 'react';
import '../../../src/assets/styles/exportButton.scss';

/**
 * Represents an export button
 * @returns {JSX}
 * @constructor
 */
const ExportButton = () => (
  <Fragment>
    <span className="export-button">
      <svg width="10px" height="10px" viewBox="0 0 433.5 433.5" className="svg-export">
        <path d="M395.25 153h-102V0h-153v153h-102l178.5 178.5L395.25 153zm-357 229.5v51h357v-51h-357z" />
      </svg>
    Export
    </span>
  </Fragment>
);

export default ExportButton;
