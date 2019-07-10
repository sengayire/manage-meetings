import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { meetingDurationBackground, borderColor } from '../../../fixtures/pieChartColors';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';
import ErrorIcon from '../../commons/ErrorIcon';
import Overlay from '../../commons/Overlay';
import AnalyticsContext from '../../helpers/AnalyticsContext';
import getSectorWidths from '../../helpers/analytics/AverageMeetingDuration';

const AverageMeetingDurationPieChart = () => {
  const { fetching, analytics } = useContext(AnalyticsContext);

  const renderPieChart = () => {
    if (analytics && analytics.analytics.length === 0) {
      return <ErrorIcon message="No resource found" />;
    }

    const dummySectorWidths = ['70', '10', '10', '10'];

    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };
    const graphData = {
      labels: [
        'Above 60 Minutes in %',
        '45-60 Minutes in %',
        '30-45 Minutes in %',
        'Below 30 Minutes in %',
      ],
      datasets: [
        {
          label: 'Average Meeting Duration',
          data: fetching
            ? dummySectorWidths : getSectorWidths(analytics.analytics),
          backgroundColor: meetingDurationBackground,
          borderColor,
          borderWidth: 4,
        },
      ],
    };

    return (
      <section className="chart-content">
        {fetching && <Overlay />}
        <div>
          <Pie data={graphData} options={options} width={172} />
        </div>
        <section className="chart-details">
          <p className="duration-first-circle">
            <span>{}</span>
            Above 60 Minutes
          </p>
          <p className="duration-second-circle">
            <span>{}</span>
            45 - 60 Minutes
          </p>
          <p className="duration-third-circle">
            <span>{}</span>
            30 - 45 Minutes
          </p>
          <p className="duration-forth-circle">
            <span>{}</span>
            Below 30 Minutues
          </p>
        </section>
      </section>
    );
  };

  const tip =
    'The percentage representation of the average amount of time people spend in all booked meeting rooms in a set time period';
  return (
    <article className="pie-chart overlay-container">
      <section className="chart-header">
        <p className="chart-title">Average Meetings Duration [%]</p>
        {Tip(tip)}
      </section>
      {renderPieChart()}
    </article>
  );
};

export default AverageMeetingDurationPieChart;
