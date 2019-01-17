import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * Component that builds reusable table headers
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const TableHead = props => (
  <thead>
    <tr>
      {props.titles.map(title => (
        <th key={title}>{title}</th>
      ))}
    </tr>
  </thead>
);

TableHead.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHead;
