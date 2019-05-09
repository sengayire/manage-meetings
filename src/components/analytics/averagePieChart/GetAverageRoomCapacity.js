import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import roomCapacityBackground from '../../../fixtures/pieChartColors';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/roomCapacityPieChart.scss';
import ErrorIcon from '../../../components/commons/ErrorIcon';
import Overlay from '../../commons/Overlay';
import { getAllRooms } from '../../helpers/QueriesHelpers';

export class GetAverageRoomCapacityComponent extends Component {
  state = {
    allRooms: {
      rooms: [],
    },
    loading: true,
  };

  componentDidMount() {
    this.getAllRooms();
  }

  componentDidCatch(prevProps) {
    const { updateParent } = this.props;
    if (prevProps.updateParent !== updateParent) {
      updateParent('roomCapacity', this.getRoomData());
    }
  }

  /**
   * formats room data
   *
   * @returns {Object}
   */
  getRoomData = () => {
    const roomsLength = this.state.allRooms.rooms.length;
    const allRoomsData = this.state.allRooms.rooms;
    const capacity = allRoomsData.map(room => room.capacity);
    const lessThanTenArray = capacity.filter(num => num < 10);
    const greaterThanTwentyArray = capacity.filter(num => num > 20);
    const betweenTenandTwenty = capacity.filter(num => num <= 20 && num >= 10);
    const lessThanTenlength = lessThanTenArray.length;
    const greaterThanTwentyArrayLength = greaterThanTwentyArray.length;
    const betweenTenandTwentyLength = betweenTenandTwenty.length;
    const lessThanTenData = this.getPercentage(lessThanTenlength, roomsLength);
    const betweenTenandTwentyData = this.getPercentage(betweenTenandTwentyLength, roomsLength);
    const greaterThanTwentyData = this.getPercentage(greaterThanTwentyArrayLength, roomsLength);
    return { lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData };
  };

  /**
   * converts to percentage
   *
   * @param {Integer} capacity
   * @param {Integer} total
   *
   * @returns {Integer}
   */
  getPercentage = (capacity, total) => {
    const result = (capacity / total) * 100;
    return Math.round(result);
  };


  getAllRooms = async () => {
    const { allRooms } = await getAllRooms();
    this.setState({
      allRooms, loading: false,
    });
  }

  /**
   * renders pie chart for room data
   *
   * @returns {JSX}
   */
  renderPieChart = () => {
    const { loading, allRooms } = this.state;
    if (!loading && !allRooms) {
      return (
        <ErrorIcon message="Resource not found" />
      );
    }

    const { lessThanTenData = '100', betweenTenandTwentyData = '0', greaterThanTwentyData = '0' } = allRooms ? this.getRoomData() : {};
    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };
    const graphData = {
      labels: ['Less than 10 in %', '10-20 in %', 'More than 20 in %'],
      datasets: [
        {
          label: 'Average Meetings Duration',
          data: [lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData],
          backgroundColor: roomCapacityBackground,
          borderWidth: 3,
        },
      ],
    };

    return (
      <Fragment>
        <section className="chart-content">
          {loading && <Overlay />}
          <Pie data={graphData} options={options} height={168} width={230} />
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
      </Fragment>
    );
  };

  render() {
    const tip = "The percentage representation of the average rooms' capacity ";
    return (
      <article className="pie-chart overlay-container">
        <section className="chart-header">
          <p className="chart-title">Average Rooms Capacity [%]</p>
          {Tip(tip)}
        </section>
        {this.renderPieChart()}
      </article>
    );
  }
}

GetAverageRoomCapacityComponent.propTypes = {
  updateParent: PropTypes.func,
};

GetAverageRoomCapacityComponent.defaultProps = {
  updateParent: null,
};

export default GetAverageRoomCapacityComponent;
