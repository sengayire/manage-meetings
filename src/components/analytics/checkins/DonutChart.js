import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/donutchart.scss';

// Import the tip
import Tip from '../../commons/Tooltip';

const DonutChart = (props) => {
  const {
    chartTitle,
    percentage,
    entries,
    total,
    hasInfo,
    hintText,
    chartSvg,
    tip,
  } = props;

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
        <div className="chart diagram">
          <img src={chartSvg} alt="chart-svg" />
          <p>{percentage}%</p>
        </div>
        {hasInfo && (
          <div className="chart text">
            <p>
              {entries}/{total}
            </p>
            <p>Meeting</p>
          </div>
        )}
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
  tip: PropTypes.string.isRequired,
};
DonutChart.defaultProps = {
  chartTitle: 'Pie Chart',
  hintText: '',
  percentage: 0,
  entries: 0,
  total: 10,
  hasInfo: true,
  chartSvg: '',
};

export default DonutChart;
