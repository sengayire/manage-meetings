import React, { Component } from 'react';

import QueryBookingsCount from '../QueryBookingsCount';

// import svg files
import helpIcon from '../../../../src/assets/images/help_outline_24px.svg';

// import styles
import '../../../../src/assets/styles/barGraphBaseStyle.scss';
import '../../../../src/assets/styles/bookingsCountBarGraph.scss';


class BookingsCountBarGraph extends Component {
  state = {
    isHovering: false,
    xPosition: 0,
    yPosition: 0,
    hoverInfo: 'Total count of bookings in a given time',
  };
  handleMouseHover = (e) => {
    this.setState({
      isHovering: true,
      xPosition: e.nativeEvent.clientX,
      yPosition: e.nativeEvent.clientY,
    });
  };
  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    return (
      <article className="bar-graph">
        <section className="graph-header">
          {this.state.isHovering ? (
            <div
              className="graph-hover-info"
              style={{
                top: `${this.state.yPosition}px`,
                left: `${this.state.xPosition}px`,
              }}
            >{this.state.hoverInfo}
            </div>
      ) : null}
          <p className="graph-title">Total Bookings Count</p>
          <img
            src={helpIcon}
            alt="help icon"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseLeave}
          />
        </section>
        <section className="graph-content">
          <section className="graph-details">
            <QueryBookingsCount />
          </section>
        </section>
      </article>
    );
  }
}

export default BookingsCountBarGraph;
