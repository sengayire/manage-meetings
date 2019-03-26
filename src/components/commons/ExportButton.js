import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../commons/Dropdown';
import { download24pxIcon } from '../../utils/images/images';
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
    <div className="heading">Export Options</div>
    <hr size="1" className="horizontal-line" />
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
      src={download24pxIcon}
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
