import React from 'react';
import PropTypes from 'prop-types';
import timeConvert from '../../helpers/timeConverter';

const QueryAnalyticsPerMeetingRoom = ({ data }) => (
  data.MeetingsDurationaAnalytics.map(
    ({ roomName, count, totalDuration }) => (
      <tr key={roomName}>
        <td>{roomName}</td>
        <td>{count}</td>
        <td>{timeConvert(totalDuration)}</td>
      </tr>
    ),
  )
);

QueryAnalyticsPerMeetingRoom.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default QueryAnalyticsPerMeetingRoom;
