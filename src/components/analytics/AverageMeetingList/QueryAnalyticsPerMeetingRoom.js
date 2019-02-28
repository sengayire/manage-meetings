import React from 'react';
import PropTypes from 'prop-types';
import timeConvert from '../../helpers/timeConverter';

/**
 * Component for QueryAnalyticsPerMeetingRoom
 *
 * @param {Object} data
 *
 * @returns {JSX}
 */
const QueryAnalyticsPerMeetingRoom = ({ data }) =>
  data.MeetingsDurationaAnalytics.map(({ roomName, count, totalDuration }) => (
    <div className="table__row--analytics" key={roomName}>
      <span>{roomName}</span>
      <span>{count}</span>
      <span>{timeConvert(totalDuration)}</span>
    </div>
  ));

QueryAnalyticsPerMeetingRoom.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default QueryAnalyticsPerMeetingRoom;
