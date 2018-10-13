import React, { Component } from 'react';

// import svg files
import helpIcon from '../../../../src/assets/images/help_outline_24px.svg';
import roomCapacityChart from '../../../../src/assets/images/chart_blue.svg';

// import styles
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/roomCapacityPieChart.scss';

class RoomCapacityPieChart extends Component {
  state = {
    isHovering: false,
    xPosition: 0,
    yPosition: 0,
    hoverInfo: 'Room capacity info here!',
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
      <article className="pie-chart">
        <section className="chart-header">
          {this.state.isHovering ? (
            <div
              className="chart-hover-info"
              style={{
                top: `${this.state.yPosition}px`,
                left: `${this.state.xPosition}px`,
              }}
            >
              {this.state.hoverInfo}
            </div>
          ) : null}
          <p className="chart-title">Average Room Capacity</p>
          <img
            src={helpIcon}
            alt="help icon"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseLeave}
          />
        </section>
        <section className="chart-content">
          <img src={roomCapacityChart} alt="average meeting chart" />
          <section className="chart-details">
            <p className="room-capacity-first-circle">
              <span>{}</span>
              Less than 10
            </p>
            <p className="room-capacity-second-circle">
              <span>{}</span>
              10 - 20
            </p>
            <p className="room-capacity-third-circle">
              <span>{}</span>
              More than 20
            </p>
          </section>
        </section>
      </article>
    );
  }
}

export default RoomCapacityPieChart;
