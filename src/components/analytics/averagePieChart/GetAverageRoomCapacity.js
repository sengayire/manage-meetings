import React, { Fragment, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import roomCapacityBackground from '../../../fixtures/pieChartColors';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/roomCapacityPieChart.scss';
import ErrorIcon from '../../../components/commons/ErrorIcon';
import Overlay from '../../commons/Overlay';
import AnalyticsContext from '../../helpers/AnalyticsContext';
import getRoomData from '../../helpers/analytics/AverageRoomCapacity';

export const GetAverageRoomCapacityComponent = () => {
  const { analytics, fetching } = useContext(AnalyticsContext);

  const renderPieChart = () => {
    if (analytics === null) {
      return (
        <ErrorIcon message="Resource not found" />
      );
    }

    const { lessThanTenData = '50', betweenTenandTwentyData = '25', greaterThanTwentyData = '25' } = !fetching ? getRoomData(analytics.rooms) : {};
    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };
    const graphData = {
      labels: ['More than 20 in %', '10-20 in %', 'Less than 10 in %'],
      datasets: [
        {
          label: 'Average Meetings Duration',
          data: [greaterThanTwentyData, betweenTenandTwentyData, lessThanTenData],
          backgroundColor: roomCapacityBackground,
          borderWidth: 3,
        },
      ],
    };

    return (
      <Fragment>
        <section className="chart-content">
          {fetching && <Overlay />}
          <Pie data={graphData} options={options} height={168} width={230} />
          <section className="chart-details">
            <p className="room-capacity-first-circle">
              <span>{}</span>
              More than 20
            </p>
            <p className="room-capacity-second-circle">
              <span>{}</span>
              10 - 20
            </p>
            <p className="room-capacity-third-circle">
              <span>{}</span>
              Less than 10
            </p>
          </section>
        </section>
      </Fragment>
    );
  };

  const tip = "The percentage representation of the average rooms' capacity ";
  return (
    <article className="pie-chart overlay-container">
      <section className="chart-header">
        <p className="chart-title">Average Rooms Capacity [%]</p>
        {Tip(tip)}
      </section>
      {renderPieChart()}
    </article>
  );
};

export default GetAverageRoomCapacityComponent;
