import React, { Component } from 'react';

// import svg files
import helpIcon from '../../../../src/assets/images/help_outline_24px.svg';
import averageMeetingChart from '../../../../src/assets/images/average_meeting_chart.svg';

// import styles
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';

class MeetingDurationPieChart extends Component {
  state = {
    isHovering: false,
    xPosition: 0,
    yPosition: 0,
    hoverInfo: 'Meeting duration info here!',
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
          <p className="chart-title">Average Meeting Duration</p>
          <img
            src={helpIcon}
            alt="help icon"
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseLeave}
          />
        </section>
        <section className="chart-content">
          <img src={averageMeetingChart} alt="average meeting chart" />
          <section className="chart-details">
            <p className="duration-first-circle">
              <span>{}</span>
              60 Minutes
            </p>
            <p className="duration-second-circle">
              <span>{}</span>
              45 Minutes
            </p>
            <p className="duration-third-circle">
              <span>{}</span>
              30 Minutes
            </p>
          </section>
        </section>
      </article>
    );
  }
}

export default MeetingDurationPieChart;
