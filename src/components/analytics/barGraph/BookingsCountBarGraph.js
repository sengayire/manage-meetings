import React from 'react';
import QueryBookingsCount from '../QueryBookingsCount';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/barGraphBaseStyle.scss';

const BookingsCountBarGraph = () => {
  const tip = 'Total count of bookings in a given time';
  return (
    <article className="bar-graph overlay-container">
      <section className="graph-header">
        <p className="graph-title">Total Bookings Count</p>
        {Tip(tip)}
      </section>
      <section className="graph-content">
        <QueryBookingsCount />
      </section>
    </article>
  );
};

export default BookingsCountBarGraph;
