import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../commons/Dropdown';
import IconNotifications from '../../assets/images/download_24px.svg';

// styles
import '../../assets/styles/exportButton.scss';

/**
 * Renders list of option
 *
 * @param {Function} downloadJPG
 * @param {Function} downloadCSV
 * @param {Function} downloadPDF
 *
 * @returns {JSX}
 */
const renderDropdownOptions = (downloadJPG, downloadCSV, downloadPDF) => (
  <div className="dropdown-list">
    <input type="button" onClick={downloadPDF} key="pdf" value="PDF" />
    <input type="button" onClick={downloadJPG} key="jpg" value="JPEG" />
    <input type="button" onClick={downloadCSV} key="csv" value="CSV" />
  </div>
);

/**
 * Renders export button
 *
 * @param {Object}
 *
 * @returns {JSX}
 */
const ExportButton = ({ jpegHandler, csvHandler, pdfHandler }) => (
  <Dropdown
    icon={<img
      className="dropbtn-img"
      src={IconNotifications}
      alt="download icon"
    />}
    content={renderDropdownOptions(jpegHandler, csvHandler, pdfHandler)}
  />
);

ExportButton.propTypes = {
  jpegHandler: PropTypes.func,
  csvHandler: PropTypes.func,
  pdfHandler: PropTypes.func,
};

ExportButton.defaultProps = {
  jpegHandler: null,
  csvHandler: null,
  pdfHandler: null,
};

export default ExportButton;
