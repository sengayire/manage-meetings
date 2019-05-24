import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import '../../../assets/styles/donutchart.scss';

// Import the tip
import Tip from '../../commons/Tooltip';
import Overlay from '../../commons/Overlay';

// eslint-disable-next-line react/prefer-stateless-function
/**
 * A donut Chart for Checkins
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
class DonutChart extends Component {
  /**
  * Conditionally returns a chart, loader or error message
  *
  * @param {array}
  *
  * @returns {JSX}
  */
  renderChart = () => {
    const {
      loading,
      percentage,
      entries,
      total,
      chartColor,
      hasInfo,
      dataName,
    } = this.props;

    const options = {
      legend: {
        display: false,
      },
      cutoutPercentage: 70,
    };

    let graphData;
    if (total === 0) {
      graphData = {
        labels: [dataName, 'Bookings'],
        datasets: [{
          data: [entries, 1],
          backgroundColor: chartColor,
        }],
        text: '23%',
      };
    } else {
      graphData = {
        labels: [dataName, 'Bookings'],
        datasets: [{
          data: [entries, total],
          backgroundColor: chartColor,
        }],
        text: '23%',
      };
    }

    return (
      <Fragment>
        <div className="diagram">
          <Doughnut
            data={graphData}
            width={160}
            height={160}
            options={options}
          />
          <p className={hasInfo ? 'chart-percentage' : 'no-info-percentage'}>{loading ? 45 : percentage}%</p>
        </div>
        {hasInfo && (
          <div className="chart-text">
            <p>
              {!loading && `${entries}/${total}`}
            </p>
            <p>Meetings</p>
          </div>
        )}
      </Fragment>
    );
  }

  render() {
    const {
      chartTitle,
      hintText,
      loading,
      tip,
    } = this.props;

    return (
      <div className="donut-chart overlay-container">
        {loading && <Overlay />}
        <div className="chart-header">
          <p>{chartTitle}</p>
          <div className="hint">
            {Tip(tip)}
            <div className="hint-text">
              <p>{hintText}</p>
            </div>
          </div>
        </div>
        <div className="chart-content">
          {
            this.renderChart()
          }
        </div>
      </div>
    );
  }
}

DonutChart.propTypes = {
  chartTitle: PropTypes.string,
  hintText: PropTypes.string,
  percentage: PropTypes.number,
  entries: PropTypes.number,
  total: PropTypes.number,
  hasInfo: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  chartColor: PropTypes.instanceOf(Object),
  dataName: PropTypes.string,
};
DonutChart.defaultProps = {
  chartTitle: 'Pie Chart',
  hintText: '',
  percentage: 0,
  entries: 0,
  total: 10,
  hasInfo: true,
  loading: null,
  chartColor: null,
  dataName: 'Checkins',
};

export default DonutChart;
