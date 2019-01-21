import React from 'react';
import PropTypes from 'prop-types';

import QueryBookingsCount from '../QueryBookingsCount';
import Tip from '../../commons/Tooltip';

// import styles
import '../../../../src/assets/styles/barGraphBaseStyle.scss';

/**
 * Bar graph for bookings count
 *
 * @param {Object} dateValueObject
 *
 * @returns {JSX}
 */
const BookingsCountBarGraph = ({ dateValue }) => {
  const tip = 'Total count of bookings in a given time';
  return (
    <article className="bar-graph">
      <section className="graph-header">
        <p className="graph-title">Total Bookings Count</p>
        {Tip(tip)}
      </section>
      <section className="graph-content">
        <QueryBookingsCount dateValue={dateValue} />
      </section>
    </article>
  );
};

BookingsCountBarGraph.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
};

BookingsCountBarGraph.defaultProps = {
  dateValue: {},
};

export default BookingsCountBarGraph;
