import React from 'react';
import Proptypes from 'prop-types';

const ColGroup = ({ numberOfMiddleColumns }) => (
  <colgroup>
    <col className="first-col" />
    {Array.from(Array(numberOfMiddleColumns).keys()).map(i => (
      <col key={`col${i}`} />
    ))}
    <col className="last-col" />
  </colgroup>
);

ColGroup.propTypes = {
  numberOfMiddleColumns: Proptypes.number,
};

ColGroup.defaultProps = {
  numberOfMiddleColumns: 2,
};

export default ColGroup;
