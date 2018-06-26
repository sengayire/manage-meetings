import React from 'react';
import PropTypes from 'prop-types';


const TableHead = props => (
  <thead>
    <tr>{props.titles.map(title => <th key={title}>{title}</th>)}</tr>
  </thead>
);

TableHead.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHead;

