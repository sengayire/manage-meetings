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
  <div className="table__headers">
    {props.titles.map(title => <span key={title}>{title}</span>)}
  </div>
);

TableHead.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHead;
