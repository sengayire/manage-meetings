import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/donutchart.scss';
import helpIcon from '../../../assets/images/help_outline.svg';

const DonutChart = (props) => {
  const {
    chartTitle, percentage, entries, total, hasInfo, hintText, chartSvg,
  } = props;
  return (
    <div className="donut-chart">
      <div className="chart-header">
        <p>{chartTitle}</p>
        <div className="hint">
          <img src={helpIcon} alt="help icon" />
          <div className="hint-text"><p>{hintText}</p></div>
        </div>
      </div>
      <div className="chart-content">
        <div className="chart diagram">
          <img src={chartSvg} alt="chart-svg" />
          <p>{percentage}%</p>
        </div>
        { hasInfo &&
        <div className="chart text">
          <p>{entries}/{total}</p>
          <p>Meeting</p>
        </div> }
      </div>
    </div>
  );
};
DonutChart.propTypes = {
  chartTitle: PropTypes.string,
  hintText: PropTypes.string,
  percentage: PropTypes.number,
  entries: PropTypes.number,
  total: PropTypes.number,
  hasInfo: PropTypes.bool,
  chartSvg: PropTypes.string,
};
DonutChart.defaultProps = {
  chartTitle: 'Pie Chart',
  hintText: 'Pie Chart',
  percentage: 0,
  entries: 0,
  total: 10,
  hasInfo: true,
  chartSvg: '',
};


export default DonutChart;
