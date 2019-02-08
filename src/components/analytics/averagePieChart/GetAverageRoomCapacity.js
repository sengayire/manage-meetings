import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import roomCapacityBackground from '../../../fixtures/pieChartColors';
import { GET_ALL_ROOMS } from '../../../graphql/queries/Rooms';
import Spinner from '../../commons/Spinner';

export class GetAverageRoomCapacityComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getPercentage = (capacity, total) => {
    const result = (capacity / total) * 100;
    return Math.round(result);
  }

  getRoomData = () => {
    const roomsLength = this.props.data.allRooms.rooms.length;
    const allRoomsData = this.props.data.allRooms.rooms;
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
  }

  render() {
    const { loading, error } = this.props.data;
    if (error) {
      return <div>{error.message}</div>;
    } else if (loading) {
      return <Spinner />;
    }

    const { lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData } = this.getRoomData();
    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };
    const graphData = {
      labels: ['Less than 10 ', '10-20 ', 'More than 20 '],
      datasets: [{
        label: 'Average Meeting Duration',
        data: [lessThanTenData, betweenTenandTwentyData, greaterThanTwentyData],
        backgroundColor: roomCapacityBackground,
        borderWidth: 3,
      }],
    };

    return (
      <React.Fragment>
        <Pie
          data={graphData}
          options={options}
          height={168}
          width={230}
        />
      </React.Fragment>
    );
  }
}

GetAverageRoomCapacityComponent.propTypes = {
  data: PropTypes.shape({
    allRooms: PropTypes.shape({
      rooms: PropTypes.array,
      pages: PropTypes.number,
    }),
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
};

export default compose(
  graphql(GET_ALL_ROOMS, { name: 'data' }),
)(GetAverageRoomCapacityComponent);
