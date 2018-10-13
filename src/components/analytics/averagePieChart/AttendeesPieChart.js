import React, { Component } from 'react';

// import svg files
import helpIcon from '../../../../src/assets/images/help_outline_24px.svg';
import attendeesChart from '../../../../src/assets/images/chart_attendees.svg';

// import styles
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/attendeesPieChart.scss';


class AttendeesPieChart extends Component {
  state = {
    isHovering: false,
    xPosition: 0,
    yPosition: 0,
    hoverInfo: 'Attendee hover info here!',
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
            >{this.state.hoverInfo}
            </div>
      ) : null}
          <p className="chart-title">Average No. of Attendees/ Meeting</p>
          <img
            src={helpIcon}
            alt="help icon"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseLeave}
          />
        </section>
        <section className="chart-content">
          <img src={attendeesChart} alt="average meeting chart" />
          <section className="chart-details">
            <p className="attendees-first-circle">
              <span>{}</span>
            130 (Yes)
            </p>
            <p className="attendees-second-circle">
              <span>{}</span>
            20 (Maybe)
            </p>
            <p className="attendees-third-circle">
              <span>{}</span>
            6 (No)
            </p>
          </section>
        </section>
      </article>
    );
  }
}

export default AttendeesPieChart;
