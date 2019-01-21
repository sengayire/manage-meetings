import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import '../../../assets/styles/donutchart.scss';
import Warning from '../../../assets/images/warning_icon.svg';
import Spinner from '../../../../src/components/commons/Spinner';

// Import the tip
import Tip from '../../commons/Tooltip';

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
      error,
      percentage,
      entries,
      total,
      chartColor,
      hasInfo,
      dataName,
    } = this.props;

    if (error) {
      return (
        <div className="error-class">
          <div className="icon-container">
            <img className="error-icon" src={Warning} alt="error_icon" />
          </div>
          <b><p className="error-msg">An error occurred, cannot fetch data</p></b>
        </div>
      );
    } else if (loading) {
      return (
        <div className="chart-spinner">
          <Spinner />
        </div>
      );
    }

    const options = {
      legend: {
        display: false,
      },
      cutoutPercentage: 70,
    };

    const graphData = {
      labels: [dataName, 'Bookings'],
      datasets: [{
        data: [entries, total],
        backgroundColor: chartColor,
      }],
      text: '23%',
    };

    return (
      <Fragment>
        <div className="diagram">
          <Doughnut
            data={graphData}
            width={160}
            height={160}
            options={options}
          />
          <p className={hasInfo ? 'chart-percentage' : 'no-info-percentage'}>{percentage}%</p>
        </div>
        {hasInfo && (
          <div className="chart-text">
            <p>
              {entries}/{total}
            </p>
            <p>Meeting</p>
          </div>
        )}
      </Fragment>
    );
  }

  render() {
    const {
      chartTitle,
      hintText,
      tip,
    } = this.props;

    return (
      <div className="donut-chart">
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
          {this.renderChart()}
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
  error: PropTypes.instanceOf(Object),
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
  error: null,
  loading: null,
  chartColor: null,
  dataName: 'Checkins',
};

export default DonutChart;
